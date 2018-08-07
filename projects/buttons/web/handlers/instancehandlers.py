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

# API methods for keeping cloud status and appengine db in sync via fastner box
class InstanceTenderHandler(BaseHandler):
    def get(self):
        if True:
            # update list of instances we have
            http = httplib2.Http()
            url = '%s/api/instance/list?token=%s' % (config.fastener_host_url, config.fastener_api_token)
            response, content = http.request(url, 'GET')

            # list of instance from google cloud (see ./fastener/sample-output.json)
            finstances = json.loads(content)
            print finstances

            for finstance in finstances:
                print finstance
                # only look at instances with button in them
                if 'button' in finstance['name']:
                    instance = Instance.get_by_name(finstance['name'])
                    if instance:
                        try:
                            instance.ip = finstance['networkInterfaces'][0]['accessConfigs'][0]['natIP']
                        except:
                            instance.ip = "255.255.255.255"

                        instance.status = finstance['status'] # whatever it should be
                        instance.put()
                    else:
                        # create instance (needed if instance is created directly using fastener API)
                        stream = Stream.get_by_sid(finstance['labels']['sid'])
                        instance = Instance(
                            name = finstance['name'],
                            status = "PENDING",
                            owner = None, # TODO might need fixing 
                            stream = stream.key,
                            #expires = #SOMEFUTUREDATE
                        )
                        instance.put()


        try:
            pass
        except Exception as ex:
            print "yeah, no: %s" % ex
            pass

        return self.render_template('instance/tender.html')


# list of a user's instances
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


# instance detail page
class InstanceDetailHandler(BaseHandler):
    @user_required
    def get(self, name):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up user's instances
        instance = Instance.get_by_name(name)
        stream = Stream.get_by_id(instance.stream.id())

        params = {
            'instance': instance,
            'stream': stream
        }

        return self.render_template('instance/detail.html', **params)


# create new instance
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

        # TODO validate form here

        # make the instance call to the control box
        http = httplib2.Http()
        url = '%s/api/stream/%s?token=%s' % (config.fastener_host_url, sid, config.fastener_api_token)

        # pull the response back TODO add error handling
        response, content = http.request(url, 'POST', None, headers={})
        finstance = json.loads(content)
        name = finstance['instance']

        # set up an instance 
        instance = Instance(
            name = name,
            status = "PENDING",
            owner = user_info.key,
            stream = stream.key,
            #expires = #SOMEFUTUREDATE
        )
        instance.put()

        # give the db a second to update
        time.sleep(1)

        self.add_message('%s stream instance created!' % (sid), 'success')

        params = {'name': name}
        return self.redirect_to('instance-detail', **params)


    @webapp2.cached_property
    def form(self):
        return forms.InstanceForm(self)
