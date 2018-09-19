import logging
import re
import md5
import os
import time
import base64

from datetime import datetime

import bleach
import webapp2
import httplib2

from google.appengine.api import urlfetch

from webapp2_extras import jinja2
from jinja2 import Environment, BaseLoader, FunctionLoader
from webapp2_extras import auth
from webapp2_extras import sessions

import config
from lib import utils
import web.models.models as models

# decorator for auth required
def user_required(handler):
	def check_login(self, *args, **kwargs):
		# handle authenticating user
		try:
			auth = self.auth.get_user_by_session()

			if auth:
				return handler(self, *args, **kwargs)
			else:
				next = self.request.url
				return self.redirect(self.uri_for('login', next=next))

		except AttributeError, e:
			# avoid AttributeError when the session was deleted from the server
			logging.error(e)
			self.auth.unset_session()
			self.redirect_to('index')

	return check_login

# decorator for admin required
def admin_required(handler):
	def check_login(self, *args, **kwargs):
		# load user
		user_info = models.User.get_by_id(long(self.user_id))
		
		# check if they are admin
		if user_info.admin:
			return handler(self, *args, **kwargs)
		else:
			return self.redirect_to('index')

	return check_login

def generate_csrf_token():
	session = sessions.get_store().get_session()
	if '_csrf_token' not in session:
		session['_csrf_token'] = utils.random_string()
	return session['_csrf_token']

# jinja2 custom filters
def epoch(value):
	return int(value.strftime("%s"))

def timendate(value):
	pattern = '%Y-%m-%d %H:%M:%S.%f'
	epoch = int(time.mktime(time.strptime(str(value), pattern)))
	return time.strftime('%Y-%m-%d %H:%M:%S', time.localtime(epoch))
		 
def base64encode(value):
	return base64.b64encode(value)

def jinja2_factory(app):
	j = jinja2.Jinja2(app)
	j.environment.filters.update({
		# Set filters.
		'epoch': epoch,
		'timendate': timendate,
		'base64encode': base64encode,
	})
	j.environment.globals.update({
		# Set global variables.
		'csrf_token' : generate_csrf_token,
		'uri_for': webapp2.uri_for,
		'getattr': getattr,
		'str': str
	})
	j.environment.tests.update({
		# Set tests.
		# ...
	})
	return j

def handle_error(request, response, exception):
	# grab our handler object
	handler = jinja2.get_jinja2(factory=jinja2_factory, app=webapp2.get_app())

	# make all self.view variables available in jinja2 templates
	if hasattr(handler, 'view'):
		kwargs.update(handler.view.__dict__)

	# set or overwrite special vars for jinja templates
	kwargs = {
		'google_analytics_code' : config.google_analytics_code,
		'app_name': config.app_name,
		'isdev': config.isdev,
		'app_description': config.app_description,
		'copyright_date': config.copyright_date,
		'copyright_name': config.copyright_name,
		'twitter_handle': config.twitter_handle,
		'linkedin_handle': config.linkedin_handle,
		'google_plus_handle': config.google_plus_handle,
		'url': request.url,
		'path': request.path,
		'query_string': request.query_string,
		'exception': str(exception),
		'base_layout': config.base_layout
	}

	# get the status of the response we'll send
	status_int = hasattr(exception, 'status_int') and exception.status_int or 500
	
	# whack the template out
	template = config.error_templates[status_int]
	t = handler.render_template(template, **kwargs)
	
	# log the error
	logging.error(str(status_int) + " - " + str(exception))
	
	# repsonse
	response.set_status(status_int)
	response.write(t)


class ViewClass:
	"""
		ViewClass to insert variables into the template.

		ViewClass is used in BaseHandler to promote variables automatically that can be used
		in jinja2 templates.
		Use case in a BaseHandler Class:
			self.view.var1 = "hello"
			self.view.array = [1, 2, 3]
			self.view.dict = dict(a="abc", b="bcd")
		Can be accessed in the template by just using the variables like {{var1}} or {{dict.b}}
	"""
	pass


class BaseHandler(webapp2.RequestHandler):
	# all children default to csrf enabled
	csrf_exempt = False

	def __init__(self, request, response):
		# Override the initialiser in order to set the language.
		self.initialize(request, response)
		self.view = ViewClass()

	def dispatch(self):
		# Get a session store for this request.
		self.session_store = sessions.get_store(request=self.request)

		try:
			# csrf protection
			is_post = self.request.method in ['POST', 'PUT', 'DELETE']
			if is_post and not self.request.path.startswith('/taskqueue') and not self.csrf_exempt:
				token = self.session.get('_csrf_token')
				if not token or token != self.request.get('_csrf_token'):
					self.abort(403)

			# Dispatch the request.
			webapp2.RequestHandler.dispatch(self)
		finally:
			# Save all sessions.
			self.session_store.save_sessions(self.response)

	@webapp2.cached_property
	def auth(self):
		return auth.get_auth()

	@webapp2.cached_property
	def session_store(self):
		return sessions.get_store(request=self.request)

	@webapp2.cached_property
	def session(self):
		# Returns a session using the default cookie key.
		return self.session_store.get_session()

	@webapp2.cached_property
	def messages(self):
		return self.session.get_flashes(key='_messages')

	def add_message(self, message, level=None):
		self.session.add_flash(message, level, key='_messages')

	@webapp2.cached_property
	def language(self):
		return str(Locale.parse(self.locale).language)

	@webapp2.cached_property
	def user(self):
		return self.auth.get_user_by_session()

	@webapp2.cached_property
	def user_id(self):
		return str(self.user['user_id']) if self.user else None

	@webapp2.cached_property
	def user_key(self):
		if self.user:
			user_info = models.User.get_by_id(long(self.user_id))
			return user_info.key
		return  None

	@webapp2.cached_property
	def name(self):
		if self.user:
			try:
				user_info = models.User.get_by_id(long(self.user_id))
				return "%s" % (user_info.name)
				
			except AttributeError, e:
				# avoid AttributeError when the session was delete from the server
				logging.error(e)
				self.auth.unset_session()
				self.redirect_to('index')
		return  None

	@webapp2.cached_property
	def username(self):
		if self.user:
			try:
				user_info = models.User.get_by_id(long(self.user_id))
				return str(user_info.username)
			except AttributeError, e:
				# avoid AttributeError when the session was delete from the server
				logging.error(e)
				self.auth.unset_session()
				self.redirect_to('index')
		return None

	@webapp2.cached_property
	def is_admin(self):
		if self.user:
			try:
				# load user
				user_info = models.User.get_by_id(long(self.user_id))
				return bool(user_info.admin)
			except AttributeError, e:
				# logging.error(e)
				self.auth.unset_session()
				self.redirect_to('index')

	@webapp2.cached_property
	def twofactor_enabled(self):
		if self.user:
			try:
				user_info = models.User.get_by_id(long(self.user_id))
				return user_info.tfenabled
			except AttributeError, e:
				# avoid AttributeError when the session was delete from the server
				logging.error(e)
				self.auth.unset_session()
				self.redirect_to('index')
		return None

	@webapp2.cached_property
	def email(self):
		if self.user:
			try:
				user_info = models.User.get_by_id(long(self.user_id))
				return user_info.email
			except AttributeError, e:
				# avoid AttributeError when the session was delete from the server
				logging.error(e)
				self.auth.unset_session()
				self.redirect_to('index')
		return None

	@webapp2.cached_property
	def created(self):
		if self.user:
			try:
				user_info = models.User.get_by_id(long(self.user_id))
				pattern = '%Y-%m-%d %H:%M:%S.%f'
				epoch = int(time.mktime(time.strptime(str(user_info.created), pattern)))
				return epoch
			except AttributeError, e:
				# avoid AttributeError when the session was delete from the server
				logging.error(e)
				self.auth.unset_session()
				self.redirect_to('index')
		return None

	@webapp2.cached_property
	def gravatar_url(self):
		if self.user:
			try:
				user_info = models.User.get_by_id(long(self.user_id))
				if not user_info: # this is hackish - TODO
					self.auth.unset_session()
					self.redirect_to('index')
				else:	
					# build gravatar URL
					try:
						gravatar_hash = md5.new(user_info.email.lower().strip()).hexdigest()
						gravatar_url = "www.gravatar.com/avatar/%s?s=24" % gravatar_hash
					except:
						gravatar_url = "www.gravatar.com/avatar/%s?d=identicon&f=y&s=24" % long(self.user_id)

				return gravatar_url
			
			except AttributeError, e:
				logging.error(e)
				self.redirect_to('index')

		return None

	@webapp2.cached_property
	def is_mobile(self):
		return utils.set_device_cookie_and_return_bool(self)

	@webapp2.cached_property
	def jinja2(self):
		return jinja2.get_jinja2(factory=jinja2_factory, app=self.app)

	@webapp2.cached_property
	def get_base_layout(self):
		"""
		Get the current base layout template for jinja2 templating. Uses the variable base_layout set in config
		or if there is a base_layout defined, use the base_layout.
		"""
		return self.base_layout if hasattr(self, 'base_layout') else config.base_layout

	def set_base_layout(self, layout):
		"""
		Set the base_layout variable, thereby overwriting the default layout template name in config.py.
		"""
		self.base_layout = layout

	def loader(self, url):
		return urlfetch.fetch(url).content
		
	def render_url(self, url, **kwargs):
		env = Environment(loader=FunctionLoader(self.loader))
		try:
			self.response.headers['Content-Type'] = 'text/plain'
			self.response.write(env.get_template(url).render(kwargs))
		except:
			self.response.set_status(404)

	def render_template(self, filename, **kwargs):
		# make all self.view variables available in jinja2 templates
		if hasattr(self, 'view'):
			kwargs.update(self.view.__dict__)

		# set or overwrite special vars for jinja templates
		kwargs.update({
			'debug': config.debug,
			'isdev': config.isdev,
			'app_name': config.app_name,
			'app_email': config.app_email,
			'app_domain': config.app_domain,
			'website_url': config.website_url,
			'app_description': config.app_description,
			'copyright_date': config.copyright_date,
			'copyright_name': config.copyright_name,
			'twitter_handle': config.twitter_handle,
			'linkedin_handle': config.linkedin_handle,
			'google_plus_handle': config.google_plus_handle,
			'google_analytics_code' : config.google_analytics_code, 
			'user_id': self.user_id,
			'name': self.name,
			'username': self.username,
			'email': self.email,
			'created': self.created,
			'gravatar_url': self.gravatar_url,
			'url': self.request.url,
			'path': self.request.path,
			'query_string': self.request.query_string,
			'is_mobile': self.is_mobile,
			'base_layout': self.get_base_layout,
			'twofactor_enabled': self.twofactor_enabled,
			'admin_interface_url': config.admin_interface_url,
			'admin': self.is_admin
		})
	
		if hasattr(self, 'form'):
			kwargs['form'] = self.form
		if self.messages:
			kwargs['messages'] = self.messages

		self.response.write(self.jinja2.render_template(filename, **kwargs))
