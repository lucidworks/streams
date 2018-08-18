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

# index lives at /labs on streams.lucidworks.com
class IndexHandler(BaseHandler):
	def get(self):
		return self.redirect_to('login')


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

class DocsHandler(BaseHandler):
	def get(self):
		params = {}
		return self.render_template('site/docs.html', **params)


