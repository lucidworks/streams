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

from web.models.models import LogTracking, Stream, Instance

# /api/status
class StatusHandler(BaseHandler):
	# disable csrf check in basehandler
	csrf_exempt = True

	def get(self, path=None):
		# response, type, cross posting
		params = {}
		self.response.headers['Content-Type'] = "application/json"
		self.response.headers['Access-Control-Allow-Origin'] = '*'


		# build out the response
		params['response'] = "success"
		params['message'] = "Service is up."
		params['timestamp'] = int(time.time()*1000) # return millisecond epoch
		
		# return response
		self.response.set_status(200)
		return self.render_template('api/status.json', **params)

	def options(self):
		self.response.headers['Access-Control-Allow-Origin'] = '*'
		self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
		self.response.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
		return


# /api/streams/<iid>
class StreamsHandler(BaseHandler):
	# disable csrf check in basehandler
	csrf_exempt = True

	def get(self, sid=None):
		
		# load stream information
		stream_info = Stream.get_by_sid(sid)

		# return response
		params = {
			"created": stream_info.created,
			"updated": stream_info.updated,
			"sid": stream_info.sid,
			"name": stream_info.name,
			"description": stream_info.description,
			"zipurl": stream_info.zipurl,
			"fusion_version": stream_info.fusion_version,
			"github_repo": stream_info.github_repo
		}
		
		self.response.set_status(200)
		return self.render_template('api/stream.json', **params)

	def post(self, sid=None):
		csrf_exempt = True
		
		try:
			packet = json.loads(self.request.body)
			apitoken = packet['appliance']['apitoken']
		except:
			params['message'] = "You must submit a valid JSON object with a token."
			self.response.set_status(401)
			return self.render_template('api/response.json', **params)	


		# response, type, cross posting:
		params = {}
		self.response.headers['Content-Type'] = "application/json"
		self.response.headers['Access-Control-Allow-Origin'] = '*'
		self.response.set_status(200)
		return self.render_template('api/stream.json', **params)

	def options(self):
		self.response.headers['Access-Control-Allow-Origin'] = '*'
		self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
		self.response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
		return


# /api/instances/<iid>
class InstancesHandler(BaseHandler):
	# disable csrf check in basehandler
	csrf_exempt = True

	def get(self, iid=None):
		# load stream information
		instance_info = Instance.get_by_iid(iid)

		# return response
		params = {
			"created": instance_info.created,
			"updated": instance_info.updated,
			"running": instance_info.running,
			"iid": instance_info.iid,
			"name": instance_info.name
		}

		params = {}
		self.response.set_status(200)
		return self.render_template('api/instance.json', **params)

	def post(self, iid=None):
		# response, type, cross posting:
		params = {}
		self.response.headers['Content-Type'] = "application/json"
		self.response.headers['Access-Control-Allow-Origin'] = '*'
		self.response.set_status(200)
		return self.render_template('api/instance.json', **params)

	def options(self):
		self.response.headers['Access-Control-Allow-Origin'] = '*'
		self.response.headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept'
		self.response.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS'
		return

