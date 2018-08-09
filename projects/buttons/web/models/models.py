import logging

import urllib
import httplib2
import simplejson
import yaml
import json
import random
import time

from datetime import datetime
from datetime import timedelta

import config
from webapp2_extras.appengine.auth.models import User
from google.appengine.ext import ndb
from google.appengine.api import urlfetch

from lib.utils import generate_token
from lib.github import github


# user model - extends webapp2 User model
class User(User):
	uid = ndb.StringProperty()
	username = ndb.StringProperty()
	admin = ndb.BooleanProperty(default=False)
	email = ndb.StringProperty()
	name = ndb.StringProperty()
	timezone = ndb.StringProperty()
	country = ndb.StringProperty()
	location = ndb.StringProperty()
	company = ndb.StringProperty()
	activated = ndb.BooleanProperty(default=False)
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)
	last_login = ndb.DateTimeProperty()
	tfsecret = ndb.StringProperty()
	tfenabled = ndb.BooleanProperty(default=False)
	tfa_attempt_timestamp = ndb.DateTimeProperty()
	tfa_attempt_count = ndb.IntegerProperty()
	
	@classmethod
	def get_by_email(cls, email):
		return cls.query(cls.email == email).get()

	@classmethod
	def get_by_uid(cls, uid):
		return cls.query(cls.uid == uid).get()

	@classmethod
	def get_all(cls):
		return cls.query().filter().order(-cls.created).fetch()


# streams
class Stream(ndb.Model):
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)
	sid = ndb.StringProperty()
	name = ndb.StringProperty()
	description = ndb.StringProperty()
	zipurl = ndb.StringProperty()
	fusion_version = ndb.StringProperty()
	github_repo = ndb.StringProperty()
	url_stub = ndb.StringProperty()

	@classmethod
	def get_all(cls):
		query = cls.query().filter().order(-cls.created)
		streams = query.fetch()
		return streams

	@classmethod
	def get_by_sid(cls, sid):
		return cls.query(cls.sid == sid).get()


# instances
class Instance(ndb.Model):
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)
	expires = ndb.DateTimeProperty()
	user = ndb.KeyProperty(kind=User)
	stream = ndb.KeyProperty(kind=Stream)
	name = ndb.StringProperty()
	ip = ndb.StringProperty()
	status = ndb.StringProperty()

	""" Appengine is barfing on the indexes, so disabling
	@classmethod
	def get_by_user(cls, user):
		instance_query = cls.query().filter(cls.user == user).order(-cls.created)
		instances = instance_query.fetch()
		return instances
	"""

	@classmethod
	def get_all(cls):
		query = cls.query().filter().order(-cls.created)
		instances = query.fetch()
		return instances

	@classmethod
	def get_by_iid(cls, iid):
		return cls.query().filter(cls.iid == iid).get()

	@classmethod
	def get_by_name(cls, name):
		return cls.query().filter(cls.name == name).get()


# log tracking pings
class LogTracking(ndb.Model):
	timestamp = ndb.DateTimeProperty(auto_now_add=True)
	message = ndb.StringProperty()
	ip = ndb.StringProperty()    


# log visits
class LogVisit(ndb.Model):
	timestamp = ndb.DateTimeProperty(auto_now_add=True)
	user = ndb.KeyProperty(kind=User)
	message = ndb.StringProperty()
	uastring = ndb.StringProperty()
	ip = ndb.StringProperty()


# log outgoing emails
class LogEmail(ndb.Model):
	sender = ndb.StringProperty(required=True)
	to = ndb.StringProperty(required=True)
	subject = ndb.StringProperty(required=True)
	body = ndb.TextProperty()
	when = ndb.DateTimeProperty()

