import os
import logging
import time
import random

import urllib
import urllib2
import httplib2
import hashlib
import json

from datetime import datetime
from datetime import timedelta
from StringIO import StringIO

import webapp2
from webapp2_extras import security
from webapp2_extras.auth import InvalidAuthIdError, InvalidPasswordError
from webapp2_extras.appengine.auth.models import Unique

from google.appengine.api import taskqueue

import config
import web.forms as forms
from web.models.models import User
from web.models.models import LogVisit
from web.basehandler import BaseHandler
from web.basehandler import user_required
from lib import utils, httpagentparser
from lib.github import github
from lib import pyotp

# user login at /login/
class LoginHandler(BaseHandler):
	def get(self):
		callback_url = "%s/login/complete" % (self.request.host_url)

		next = self.request.get('next')

		if next:
			dest_url=self.uri_for('login-complete', next=next)
		else:
			dest_url=self.uri_for('login-complete')

		try:
			scope = 'user:email'
			github_helper = github.GithubAuth(scope)

			# create a github login url and go
			login_url = github_helper.get_authorize_url()
			self.redirect(login_url)
		
		except Exception as ex:
			print "oh noes: %s" % ex

			# add error notice for user TODO
			self.auth.unset_session()
			self.redirect("/")


# user logout
class LogoutHandler(BaseHandler):
	def get(self):
		if self.user:
			user_info = User.get_by_id(long(self.user_id))

			# if 2fa enabled, set the last login to an hour ago
			if user_info.tfenabled:
				user_info.last_login = datetime.now() + timedelta(0, -config.session_age)
				user_info.put()

			message = "You have been logged out."
			self.add_message(message, 'info')

		self.auth.unset_session()
		self.redirect_to('index')


# google auth callback
class CallbackLoginHandler(BaseHandler):
	def get(self):
		# get our request code back from the social login handler above
		code = self.request.get('code')

		# fire up the github auth object
		scope = 'user:email'
		github_helper = github.GithubAuth(scope)

		# get the destination URL from the next parameter
		next = self.request.get('next')

		# retrieve the access token using the code and auth
		try:
				access_token = github_helper.get_access_token(code)
				user_data = github.get_user_info(access_token)
				print user_data
		except:
				message = 'Error while tokening with Github.'
				self.add_message(message, 'error')
				return self.redirect_to('index')

		# see if user is in database
		uid = str(user_data['id']) # github id
		user_info = User.get_by_uid(uid)

		# less than ideal way to handle excessive 2FA requests
		#if not user_info.activated:
		#	self.add_message("This account has been deactivated due to excessive 2FA requests. Please contact us to resolve.", "error")
		#	return self.redirect_to('about')

		# never seen them, so create user
		if not user_info:
			name = user_data['name']
			username = user_data['login']
			email = user_data['email']
			location = user_data['location']
			company = user_data['company']

			# create entry in db
			user_info = User(
				last_login = datetime.now(),
				uid = str(uid),
				username = username,
				email = email,
				activated = True
			)

			# try to create unique username
			while True:
				user_info.unique_properties = ['username']
				uniques = ['User.username:%s' % user_info.username]
				success, existing = Unique.create_multi(uniques)

				# if we already have that username, create a new one and try again
				if existing:
					user_info.username = "%s%s" % (username, random.randrange(100)) 
				else:
					break
			
			# write out the user
			user_info.put()

			# wait a few seconds for database server to update
			time.sleep(1) # seriously?

			# slack the new user signup
			if config.debug:
				in_dev = " in development"
			else:
				in_dev = ""

			slack_data = {
				'text': "New user signed up%s: %s|%s|%s|%s|%s" % (in_dev, name, username, email, location, company),
				'username': "Loubot",
				'icon_emoji': ":cloud:" 
			}
			h = httplib2.Http()

			resp, content = h.request(config.slack_webhook, 
				'POST', 
				json.dumps(slack_data),
				headers={'Content-Type': 'application/json'}
			)

		# check out 2FA status
		now_minus_age = datetime.now() + timedelta(0, -config.session_age)

		# check if 2FA is on
		if user_info.tfenabled and (user_info.last_login < now_minus_age): 
			return self.redirect_to('login-tfa', next=next, uid=user_info.uid)
		else:
			# two factor is disabled, or already complete
			user_info.last_login = datetime.now()
			user_info.put()

		# log the user in
		self.auth.set_session(self.auth.store.user_to_dict(user_info), remember=True)

		# log visit
		log_message = "user logged in"
		log = LogVisit(
			user = user_info.key,
			message = log_message,
			uastring = self.request.user_agent,
			ip = self.request.remote_addr
		)
		log.put()
		message = "You have successfully logged in!"         
		self.add_message(message, 'success')

		# take user to next page
		if next:
			return self.redirect(str(next))
		else:
			return self.redirect_to('account-status')

		try:
			pass				
		except Exception as ex:
			message = "User login went wrong: %s" % ex            
			self.add_message(message, 'error')
			return self.redirect_to('home')


class TwoFactorLoginHandler(BaseHandler):
	# non-authenticated call
	def get(self):
		params = {}
		return self.render_template('user/twofactorlogin.html', **params)

	# non-authenticated call
	def post(self):
		# pull in tfa info and user
		authcode = self.request.get('authcode')
		uid = self.request.get('uid')

		user_info = User.get_by_uid(str(uid))
		
		# secrets
		secret = user_info.tfsecret
		totp = pyotp.TOTP(secret)

		# get the destination URL from the next parameter
		next = self.request.get('next')

		# check if token verifies
		if totp.verify(authcode):
			# user has completed tfa - update login time
			user_info.last_login = datetime.now()
			user_info.put()
			time.sleep(2)

			# reset attempt count
			if user_info.tfa_attempt_count:
				user_info.tfa_attempt_count = 0
				user_info.put()

			# take user to next page
			if next:
				return self.redirect(str(next))
			else:
				return self.redirect_to('account-status')
		else:
			# 2fa failed
			user_info.tfa_attempt_timestamp = datetime.now()
			if user_info.tfa_attempt_count:
				user_info.tfa_attempt_count = user_info.tfa_attempt_count + 1
				# deactivate if spamming
				if user_info.tfa_attempt_count > 9:
					user_info.activated = False
			else:
				user_info.tfa_attempt_count = 1
			user_info.put()

		# send to login
		self.redirect_to('login', next=next)


class TwoFactorSettingsHandler(BaseHandler):
	@user_required
	def get(self):
		# get the authcode and desired action
		authcode = self.request.get('authcode')
		action = self.request.get('action')

		# lookup user's auth info
		user_info = User.get_by_id(long(self.user_id))
		secret = user_info.tfsecret
		totp = pyotp.TOTP(secret)
		
		# build paramater list
		params = {}
		
		# verify
		if action == "enable" and totp.verify(authcode):
			# authorized to enable
			user_info.tfenabled = True
			user_info.put()
		elif action == "disable" and totp.verify(authcode):
			# authorized to disable
			user_info.tfenabled = False
			user_info.put()
		else:
			# not authorized - javascript will handle adding a user message to the UI
			params['response'] = "error"
			params['result'] = "two factor auth failed"
			self.response.set_status(401)
			self.response.headers['Content-Type'] = 'application/json'
			return self.render_template('api/response.json', **params)

		# respond
		params['response'] = "success"
		params['result'] = "two factor auth successful"
		self.response.headers['Content-Type'] = "application/json"
		return self.render_template('api/response.json', **params)


class SettingsHandler(BaseHandler):
	@user_required
	def get(self):
		# load user information
		user_info = User.get_by_id(long(self.user_id))

		# form fields
		self.form.username.data = user_info.username
		self.form.name.data = user_info.name
		self.form.email.data = user_info.email
		self.form.company.data = user_info.company
		self.form.country.data = user_info.country
		self.form.timezone.data = user_info.timezone
	
		# extras
		params = {}
		params['tfenabled'] = user_info.tfenabled

		# create holder token to setup 2FA - this will continue until user enables 2fa
		if user_info.tfenabled == False:
			secret = pyotp.random_base32()
			totp = pyotp.TOTP(secret)
			qrcode = totp.provisioning_uri("%s-%s" % (config.app_name, user_info.email))
			params['qrcode'] = qrcode
			params['secret'] = secret
			
			# update the user's key
			user_info.tfsecret = secret
			user_info.put()

			# tell the user they need to setup 2fa
			self.add_message("Please take a moment and set up two factor authentication.", "error")

		return self.render_template('user/settings.html', **params)

	def post(self):
		if not self.form.validate():
			self.add_message("There were errors in subbitting the form.", "error")
			return self.get()

		username = self.form.username.data.lower()
		name = self.form.name.data.strip()
		email = self.form.email.data.strip()
		company = self.form.company.data.strip()
		country = self.form.country.data.strip()
		timezone = self.form.timezone.data.strip()

		user_info = User.get_by_id(long(self.user_id))

		try:
			# update username if it has changed and it isn't already taken
			if username != user_info.username:
				user_info.unique_properties = ['username']
				uniques = ['User.username:%s' % username]
				
				# create the unique username and auth_id
				success, existing = Unique.create_multi(uniques)

				if success:
					# free old uniques and update user
					Unique.delete_multi(['User.username:%s' % user_info.username])
					user_info.username = username
					self.add_message('Your new username is %s.' % format(username), 'success')

				else:
					# username not unique
					self.add_message('The username %s is already in use.' % format(username), 'error')
					return self.get()

			# update email if it has changed and it isn't already taken
			if email != user_info.email:
				user_info.unique_properties = ['email']
				uniques = ['User.email:%s' % email]
				
				# create the unique username and auth_id
				success, existing = Unique.create_multi(uniques)

				if success:
					# free old uniques and update user
					Unique.delete_multi(['User.email:%s' % user_info.email])
					user_info.email = email
					self.add_message('Your new email is %s.' % format(email), 'success')

				else:
					# user's email not unique
					self.add_message('That email address is already in use.', 'error')
					return self.get()

			# update database                
			user_info.name = name
			user_info.company = company
			user_info.country = country
			user_info.timezone = timezone
			user_info.put()

			self.add_message("Your settings have been saved.", 'success')
			return self.get()

		except (AttributeError, KeyError, ValueError), e:
			logging.error('Error updating profile: ' + e)
			self.add_message('Unable to update profile. Please try again later.', 'error')
			return self.get()


	@webapp2.cached_property
	def form(self):
		return forms.EditProfileForm(self)


class StatusHandler(BaseHandler):
	@user_required
	def get(self):
		# lookup user's auth info
		user_info = User.get_by_id(long(self.user_id))

		# params build out
		params = {
		}

		return self.render_template('user/status.html', **params)


class AccountHandler(BaseHandler):
	@user_required
	def get(self):
		# lookup user's auth info
		user_info = User.get_by_id(long(self.user_id))

		params = {}
		return self.render_template('user/account.html', **params)


class AccountDeleteHandler(BaseHandler):
	@user_required
	def get(self):
		# delete a user from the system
		pass
