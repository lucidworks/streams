# standard library imports
import logging, os
import urllib, urllib2, httplib2
import hashlib, json

# related webapp2 imports
import webapp2
from webapp2_extras import security
from webapp2_extras.auth import InvalidAuthIdError, InvalidPasswordError
from webapp2_extras.appengine.auth.models import Unique

# google imports
from google.appengine.api import taskqueue
from google.appengine.api import users

# local application/library specific imports
import config
import web.forms as forms
import web.models.models as models

from lib import utils, httpagentparser
from web.basehandler import BaseHandler
from web.basehandler import user_required

from web.models.models import Stream

# index lives at /labs on streams.lucidworks.com
class IndexHandler(BaseHandler):
	def get(self):
		return self.redirect_to('labs')

# slackbot card handler
class SlackbotHandler(BaseHandler):
	def get(self):
		params = {}
		return self.render_template('site/slack.html', **params)


class SendEmailHandler(BaseHandler):
	# disable csrf check in basehandler
	csrf_exempt = True

	# task queue stuff for sending emails
	def post(self):
		from google.appengine.api import mail, app_identity
		from google.appengine.api.datastore_errors import BadValueError
		from google.appengine.runtime import apiproxy_errors
		import config
		from web.models import models

		subject = self.request.get("subject")
		body = self.request.get("body")
		sender = self.request.get("sender")

		if sender != '' or not utils.is_email_valid(sender):
			if utils.is_email_valid(config.contact_sender):
				sender = config.contact_sender
			else:
				app_id = app_identity.get_application_id()
				sender = "%s <no-reply@%s.appspotmail.com>" % (app_id, app_id)

		try:
			logEmail = models.LogEmail(
				sender = sender,
				to = config.contact_recipient,
				subject = subject,
				body = body,
				when = utils.get_date_time("datetimeProperty")
			)
			logEmail.put()
			
		except (apiproxy_errors.OverQuotaError, BadValueError):
			logging.error("Error saving Email Log in datastore")

		try:
			mail.send_mail(sender, config.contact_recipient, subject, body)
		except Exception as ex:
			logging.error("Error sending email: %s" % ex)


# /labs/up
class LabsHandler(BaseHandler):
	def get(self):
		# look up streams
		streams = Stream.get_all()
		params = { 'streams': streams }

		return self.render_template('site/welcome.html', **params)


class DocsHandler(BaseHandler):
	def get(self):
		params = {}
		return self.render_template('site/docs.html', **params)


class APIWildcardHandler(BaseHandler):
	def get(self, wildcard='whatever'):

		# no token, no user, no data
		params = {
			'response': "ok",
			'message': "include a [token] parameter with a valid token and path"
		}

		"""
		HTTP/1.1 402 Payment Required
		set-cookie: dvc=desktop; expires=Sat, 05-Jan-2019 00:50:47 GMT; path=/; HttpOnly
		content-type: application/json; charset=utf-8
		Expires: Sat, 22 Dec 2018 00:50:47 GMT
		Cache-Control: no-cache
		Content-Length: 112
		Server: Development/2.0
		Date: Sat, 22 Dec 2018 00:50:47 GMT
		"""

		# self.response.headers['Server'] = 'LucidworksLabs/1.0' # doesn't work
		self.response.status = '402 Payment Required'
		self.response.status_int = 402
		self.response.headers['Content-Type'] = "application/json"
		
		return self.render_template('api/response.json', **params)


class APIStatusHandler(BaseHandler):
	def get(self, sid=None):
		# check token
		token = self.request.get('token')
		if token != "":
			user_info = models.User.get_by_token(token)
			num_starts = models.Instance.get_starts(300) # last five minutes

			params = {
				'starts_last_five_minutes': num_starts,
				'confidence': 0.50
			}
			self.response.headers['Content-Type'] = "application/json"
			return self.render_template('api/status_ok.json', **params)
 
		# no token, no user, no data
		params = {
			'response': "ok",
			'message': "must include [token] parameter with a valid token"
		}

		"""
		HTTP/1.1 402 Payment Required
		set-cookie: dvc=desktop; expires=Sat, 05-Jan-2019 00:50:47 GMT; path=/; HttpOnly
		content-type: application/json; charset=utf-8
		Expires: Sat, 22 Dec 2018 00:50:47 GMT
		Cache-Control: no-cache
		Content-Length: 112
		Server: Development/2.0
		Date: Sat, 22 Dec 2018 00:50:47 GMT
		"""

		# self.response.headers['Server'] = 'LucidworksLabs/1.0' # doesn't work
		self.response.status = '402 Payment Required'
		self.response.status_int = 402
		self.response.headers['Content-Type'] = "application/json"
		
		return self.render_template('api/response.json', **params)

