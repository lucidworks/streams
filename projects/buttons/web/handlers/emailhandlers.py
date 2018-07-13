import logging

from google.appengine.api import mail, app_identity
from google.appengine.api.datastore_errors import BadValueError
from google.appengine.runtime import apiproxy_errors

import config
from lib import utils
from web.models.models import User, LogEmail
from web.basehandler import BaseHandler

class SendEmailInviteHandler(BaseHandler):
	def post(self):
		to = self.request.get("to")
		invitor_id = self.request.get("invitor_id")
		invite_url = self.request.get("invite_url")

		# admin of the pool
		sender = config.contact_sender

		# test to see if the sender_id is real
		invitor = User.get_by_id(long(invitor_id))
		# if we found the sending user and group
		if invitor:
			# rest of the email stuff
			subject = "You've Been Invited to %s" % (config.app_name)
			body = """
Howdy!

You've been invited to %s by %s.  Acceptance of the invite will require linking the site to your Google account.

%s

This invite will allow you to start using the Wisdom API.

If this email comes as a complete surprise to you, simply delete it.  We may yet meet again.

Cheers,

%s
%s
		""" % (group.name, config.app_name, invitor.username, invite_url, group.name, config.app_owner, config.app_name)

			logEmail = LogEmail(
				sender = sender,
				to = to,
				subject = subject,
				body = body,
				when = utils.get_date_time("datetimeProperty")
			)
			logEmail.put()

			try:
				mail.send_mail(sender, to, subject, body)
			except Exception as ex:
				logging.error("Failed attempt to send invite email because %s." % ex)
		else:
			# doing nothing
			logging.error("Failed attempt to send invite email.")