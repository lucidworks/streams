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


# region model (not used yet - see fastener main.py for regions)
"""
class Region(ndb.Model):
	rid = ndb.IntegerProperty()
	name = ndb.StringProperty(default="None")
	in_use = ndb.BooleanProperty(default=True)
"""

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
	api_token = ndb.StringProperty()
	superuser = ndb.BooleanProperty(default=False)
	user_type = ndb.StringProperty(default="default") # default
	max_instances = ndb.IntegerProperty(default=3) # min limit set here
	password = ndb.StringProperty()
	ssh_key = ndb.StringProperty()
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

	@classmethod
	def get_by_token(cls, api_token):
		return cls.query(cls.api_token == api_token).get()


# zones
class RegionZone(ndb.Model):
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)
	regionid = ndb.StringProperty() # west1, east4, etc.
	zoneid = ndb.StringProperty() # a, b, etc.
	description = ndb.StringProperty() # west1a, east4b, etc.


# streams
class Stream(ndb.Model):
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)
	sid = ndb.StringProperty(default="lou")
	name = ndb.StringProperty(default="button-one")
	description = ndb.StringProperty(default="Fusion")
	tgzfile = ndb.StringProperty(default="button-starter42.tgz")
	github_repo = ndb.StringProperty(default="/kordless/buttons/")
	app_stub = ndb.StringProperty(default=":8764/admin/")
	labs_link = ndb.StringProperty(default="https://lucidworks.com/labs/starter42")
	fusion_version = ndb.StringProperty(default="4.2.1")
	hot_starts = ndb.IntegerProperty(default=0)
	start_eta = ndb.IntegerProperty(default=600) # a guess

	@classmethod
	def get_all(cls):
		query = cls.query().filter().order(cls.name)
		streams = query.fetch()
		return streams

	@classmethod
	def get_by_sid(cls, sid):
		return cls.query(cls.sid == sid).get()


# instances
class Instance(ndb.Model):
	created = ndb.DateTimeProperty(indexed=True, auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)
	started = ndb.DateTimeProperty()
	expires = ndb.DateTimeProperty()
	start_eta = ndb.DateTimeProperty()
	user = ndb.KeyProperty(kind=User)
	stream = ndb.KeyProperty(kind=Stream)
	region = ndb.StringProperty(default="any")
	name = ndb.StringProperty()
	renamed = ndb.StringProperty()
	topic = ndb.StringProperty(default="ai")
	ip = ndb.StringProperty(default="None") # leave as None case issue
	admin_link = ndb.StringProperty() # just uses IP + :8764
	password = ndb.StringProperty() # admin password
	app_link = ndb.StringProperty() # uses IP + stream.url_stub
	status = ndb.StringProperty()
	hotstart = ndb.BooleanProperty(indexed=True, default=False)
	preemptible = ndb.BooleanProperty(indexed=True, default=True)
	tender_action = ndb.StringProperty(default="NONE")
	start_eta = ndb.IntegerProperty(default=600) # seconds accurate

	""" Appengine is barfing on the indexes, so disabling
	@classmethod
	def get_by_user(cls, user):
		instance_query = cls.query().filter(cls.user == user).order(-cls.created)
		instances = instance_query.fetch()
		return instances
	"""
	@classmethod
	def get_by_password(cls, password):
		return cls.query().filter(cls.password == password).get()

	@classmethod
	def get_hotstarts(cls):
		query = cls.query().filter(cls.hotstart==True)
		instances = query.fetch()
		return instances

	@classmethod
	def get_starts(cls, seconds):
		delta = datetime.now() - timedelta(0, seconds)
		query = cls.query().filter(cls.started>delta)
		instances = query.fetch()
		num_starts = len(instances)
		return num_starts

	@classmethod
	def get_preemptible(cls):
		query = cls.query().filter(cls.preemptible==False)
		instances = query.fetch()
		return instances

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

#################

# next pages model
class NextPages(ndb.Model):
	timestamp = ndb.DateTimeProperty(auto_now_add=True)
	url = ndb.StringProperty()
	npid = ndb.StringProperty()
	
	@classmethod
	def get_by_npid(cls, npid):
		return cls.query().filter(cls.npid == npid).get()


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

