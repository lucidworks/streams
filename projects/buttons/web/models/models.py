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


# blog posts and pages
class App(ndb.Model):
	created = ndb.DateTimeProperty(auto_now_add=True)
	updated = ndb.DateTimeProperty(auto_now=True)
	owner = ndb.KeyProperty(kind=User)
	title = ndb.StringProperty()
	summary = ndb.StringProperty()
	filename = ndb.StringProperty()
	slug = ndb.StringProperty()
	article_type = ndb.StringProperty()
	draft = ndb.BooleanProperty(default=True)
	
	@classmethod
	def get_all(cls):
		article_query = cls.query().filter().order(-cls.created)
		articles = article_query.fetch()
		return articles

	@classmethod
	def get_by_user(cls, user):
		article_query = cls.query().filter(cls.owner == user).order(-Article.created)
		articles = article_query.fetch()
		return articles

	@classmethod
	def get_by_type(cls, article_type):
		article_query = cls.query().filter(cls.article_type == article_type).order(-Article.created)
		articles = article_query.fetch()
		return articles

	@classmethod
	def get_by_slug(cls, slug):
		article_query = cls.query().filter(cls.slug == slug)
		article = article_query.get()
		return article


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

