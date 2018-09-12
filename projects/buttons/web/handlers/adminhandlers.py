import time
import httplib2, json
import webapp2

import config
import web.forms as forms
from web.basehandler import BaseHandler
from web.basehandler import user_required, admin_required
from web.models.models import User, Stream, Instance


class AdminStreamsAPIHandler(BaseHandler):
    def get(self, sid=None):
        # check token
        token = self.request.get('token')
        if token != "":
            user_info = User.get_by_token(token)

        # look up streams
        stream = Stream.get_by_sid(sid)

        params = {
            'stream': stream
        }
        self.response.headers['Content-Type'] = "application/json"
        return self.render_template('api/stream.json', **params)


class AdminInstancesAPIHandler(BaseHandler):
    def get(self, name=None):
        # check token
        token = self.request.get('token')
        if token != "":
            user_info = User.get_by_token(token)

            if user_info:
                instance = Instance.get_by_name(name)

                params = {
                    'instance': instance
                }
                self.response.headers['Content-Type'] = "application/json"
                return self.render_template('api/instance.json', **params)
        
        # no token, no user, no data
        params = {"response": "fail", "message": "must include [token] parameter with a valid token"}
        return self.render_template('api/response.json', **params)
        

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
    def delete(self, stream_id=None):
        # delete the entry from the db
        stream = Stream.get_by_id(long(stream_id))
        sid = stream.sid

        if stream:
            stream.key.delete()
            self.add_message('Stream successfully deleted!', 'success')
        else:
            self.add_message('Something went horribly wrong somewhere!', 'warning')

        # hangout for a second
        if config.isdev:
            time.sleep(1)

        params = {"response": "success", "message": "stream %s deleted" % sid}
        return self.render_template('api/response.json', **params)
 

    @user_required
    @admin_required
    def post(self):
        if not self.form.validate():
            self.add_message('Form did not validate. Try again!', 'error')
            return self.get()

        # pull the github token out of the social user db
        user_info = User.get_by_id(long(self.user_id))
        
        # load values out of the form, including whether the gist should be public or not
        sid = self.form.sid.data.strip()
        name = self.form.name.data.strip()
        description = self.form.description.data.strip()
        tgzfile = self.form.tgzfile.data.strip()
        fusion_version = self.form.fusion_version.data.strip()
        github_repo = self.form.github_repo.data.strip()
        app_stub = self.form.app_stub.data.strip()
        labs_link = self.form.labs_link.data.strip()

        # save the stream          
        stream = Stream(
            sid = sid,
            name = name,
            description = description,
            tgzfile = tgzfile,
            fusion_version = fusion_version,
            github_repo = github_repo,
            app_stub = app_stub,
            labs_link = labs_link
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

    @user_required
    @admin_required
    def delete(self, instance_id=None):
        # delete instance
        instance = Instance.get_by_id(long(instance_id))
        name = instance.name
        
        # kill it via API call and delete via API
        if instance:
            # make the instance call to the control box
            http = httplib2.Http(timeout=10)
            url = '%s/api/instance/%s/delete?token=%s' % (
                config.fastener_host_url, 
                name,
                config.fastener_api_token
            )

            # pull the response back TODO add error handling
            response, content = http.request(url, 'GET', None, headers={})

            # delete if google returns pending
            if json.loads(content)['status'] == "PENDING":
                instance.key.delete()
        else:
            pass
            # TODO implement this, even thought it's likely not to happen

        # hangout for a second
        if config.isdev:
            time.sleep(1)

        params = {"response": "success", "message": "instance %s deleted" % name}
        return self.render_template('api/response.json', **params)
 

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

    @user_required
    @admin_required
    def post(self):
        uid = self.request.get('uid')
        superuser = self.request.get('super')

        # lookup user's auth info
        user_info = User.get_by_id(long(uid))

        # lookup user's auth info
        loggedin_user_info = User.get_by_id(long(self.user_id))

        # only allow kordless to modify kordless
        if user_info.username == "kordless" and user_info.username != loggedin_user_info.username:
            params = {"response": "fail", "message": "you can not touch that user"}
            self.response.set_status(402)
            return self.render_template('api/response.json', **params)

        # only allow erikhatcher to modify erikhatcher
        if user_info.username == "erikhatcher" and user_info.username != loggedin_user_info.username:
            params = {"response": "fail", "message": "you can not touch that user"}
            self.response.set_status(402)
            return self.render_template('api/response.json', **params)

        if user_info and superuser == "1":
            user_info.superuser = True
            user_info.max_instances = 10
            user_info.put()
        elif user_info:
            user_info.superuser = False
            user_info.max_instances = 3 # max instances are set here and in model for user
            user_info.put()

        params = {"response": "success", "message": "user %s modified" % uid}
        return self.render_template('api/response.json', **params)


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