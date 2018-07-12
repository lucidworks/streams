# standard library imports
import logging, os, md5, sys
import hashlib, json
import simplejson
import time
from datetime import datetime
from HTMLParser import HTMLParser

# google
from google.appengine.ext import ndb
from google.appengine.api import urlfetch

# related webapp2 imports
import webapp2
from webapp2_extras import security
from webapp2_extras.auth import InvalidAuthIdError, InvalidPasswordError
from webapp2_extras.appengine.auth.models import Unique

# local application/library specific imports
import config
from lib.utils import generate_token
from web.basehandler import BaseHandler

from web.models.models import LogTracking

# /api/status
class StatusHandler(BaseHandler):
	# disable csrf check in basehandler
	csrf_exempt = True

	def get(self, path=None):
		# response, type, cross posting
		params = {}
		self.response.headers['Content-Type'] = "application/json"
		self.response.headers['Access-Control-Allow-Origin'] = '*'

		if True:
			# build out the response
			params['response'] = "success"
			params['message'] = "Service is up."
			params['timestamp'] = int(time.time()*1000) # return millisecond epoch
			
			# return response
			self.response.set_status(200)
			return self.render_template('api/status.json', **params)

		else:
			# build out the error response
			self.response.set_status(501)
			params['response'] = "error"
			params['message'] = "Service is down."

			return self.render_template('api/response.json', **params)

	def options(self):
		self.response.headers['Access-Control-Allow-Origin'] = '*'
		self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
		self.response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
		return

# /api/instance/<iid>
class InstanceHandler(BaseHandler):
	# disable csrf check in basehandler
	csrf_exempt = True

	def get(self, iid):
		return

	def post(self):
		# response, type, cross posting:
		params = {}
		self.response.headers['Content-Type'] = "application/json"
		self.response.headers['Access-Control-Allow-Origin'] = '*'


	def options(self):
		self.response.headers['Access-Control-Allow-Origin'] = '*'
		self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
		self.response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
		return

