import time

import webapp2

import config
import web.forms as forms
from web.basehandler import BaseHandler
from web.basehandler import user_required, admin_required
from web.models.models import User

class AdminHandler(BaseHandler):
	@user_required
	@admin_required
	def get(self):
		# lookup user's auth info
		user_info = User.get_by_id(long(self.user_id))

		params = {}
		return self.render_template('admin/status.html', **params)


class UsersHandler(BaseHandler):
	@user_required
	@admin_required
	def get(self):
		# lookup user's auth info
		user_info = User.get_by_id(long(self.user_id))

		# look up usrs
		users = User.get_all()

		params = {
			'users': users
		}

		return self.render_template('admin/users.html', **params)


class UsersExportHandler(BaseHandler):
	@user_required
	@admin_required
	def get(self):
		# lookup user's auth info
		user_info = User.get_by_id(long(self.user_id))

		# look up usrs
		users = User.get_all()

		params = {
			'users': users
		}

		# mime it up
		self.response.headers['Content-Type'] = "text/csv"
		self.response.headers['Content-Disposition'] = "attachment; filename=users.csv"
		return self.render_template('admin/user.csv', **params)

