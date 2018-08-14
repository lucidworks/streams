import time

import webapp2

import config
import web.forms as forms
from web.basehandler import BaseHandler
from web.basehandler import user_required, admin_required
from web.models.models import User, Stream, Instance

class AdminStreamsHandler(BaseHandler):
    @user_required
    @admin_required
    def get(self, sid=None):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up streams
        streams = Stream.get_all()

        params = {
            'streams': streams
        }

        return self.render_template('admin/streams.html', **params)

    @user_required
    @admin_required
    def delete(self, sid):
        pass

    @user_required
    @admin_required
    def post(self):
        if not self.form.validate():
            return self.get()

        # pull the github token out of the social user db
        user_info = User.get_by_id(long(self.user_id))
        
        # load values out of the form, including whether the gist should be public or not
        sid = self.form.sid.data.strip()
        name = self.form.name.data.strip()
        description = self.form.description.data.strip()
        zipurl = self.form.zipurl.data.strip()
        fusion_version = self.form.fusion_version.data.strip()
        github_repo = self.form.github_repo.data.strip()
        url_stub = self.form.url_stub.data.strip()

        # save the stream          
        stream = Stream(
            sid = sid,
            name = name,
            description = description,
            zipurl = zipurl,
            fusion_version = fusion_version,
            github_repo = github_repo,
            url_stub = url_stub
        )

        stream.put()

        # give the db a second or two to update
        time.sleep(1)

        self.add_message('Stream %s successfully created!' % name, 'success')
        params = {}
        return self.redirect_to('admin-streams', **params)


    @webapp2.cached_property
    def form(self):
        return forms.StreamForm(self)


class AdminInstancesHandler(BaseHandler):
    @user_required
    @admin_required
    def get(self):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up instances
        instances = Instance.get_all()

        params = {
            'instances': instances
        }

        return self.render_template('admin/instances.html', **params)


class AdminUsersHandler(BaseHandler):
    @user_required
    @admin_required
    def get(self):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up users
        users = User.get_all()

        params = {
            'users': users
        }

        return self.render_template('admin/users.html', **params)


class AdminUsersExportHandler(BaseHandler):
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