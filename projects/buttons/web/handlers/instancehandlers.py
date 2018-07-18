# standard library imports
import logging, os
import urllib, urllib2, httplib2
import hashlib, json
import time

import webapp2

import config
import web.forms as forms
from web.basehandler import BaseHandler
from web.basehandler import user_required, admin_required
from web.models.models import User, Instance, Stream


class InstanceTenderHandler(BaseHandler):
    def get(self):
        print "tender"
        return self.render_template('instance/tender.html')

class InstancesHandler(BaseHandler):
    @user_required
    def get(self):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up user's instances
        instances = Instance.get_by_user(user_info.key)

        params = {
            'instances': instances
        }

        return self.render_template('instance/list.html', **params)


class InstanceDetailHandler(BaseHandler):
    @user_required
    def get(self, iid):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up user's instances
        instance = Instance.get_by_iid(iid)
        print instance

        params = {
            'instance': instance
        }

        return self.render_template('instance/detail.html', **params)


class InstanceCreateHandler(BaseHandler):
    @user_required
    def get(self):
        # stream choice pulldown
        self.form.stream.choices=[]

        # add list of streams to pulldown
        streams = Stream.get_all()
        for stream in streams:
            self.form.stream.choices.insert(0, (stream.key.id(), stream.name))

        # know the user
        user_info = User.get_by_id(long(self.user_id))
        params = {}
        return self.render_template('instance/create.html', **params)
        
    @user_required
    def post(self):
        # know the user
        user_info = User.get_by_id(long(self.user_id))
        
        # get form values
        stream = Stream.get_by_id(int(self.form.stream.data.strip()))
        sid = stream.sid

        print sid

        # validate form
        # not working
        #if not self.form.validate():
        #    self.add_message("The new instance did not validate.", "error")
        #    return self.get()

        # set up an instance 
        instance = Instance(
            owner = user_info.key,
            stream = stream.key
        )

        instance.put()

        # give the db a second to update
        time.sleep(1)

        self.add_message('Instance %s for stream %s created!' % (iid, name), 'success')
        params = {"iid": iid}
        return self.redirect_to('instance-detail', **params)


    @webapp2.cached_property
    def form(self):
        return forms.InstanceForm(self)
