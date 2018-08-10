# standard library imports
import logging, os
import urllib, urllib2, httplib2
import hashlib, json
import time, datetime

from lib.dateutil import parser as DUp

import webapp2

import config
import web.forms as forms
from web.basehandler import BaseHandler
from web.basehandler import user_required, admin_required
from web.models.models import User, Instance, Stream
from lib import slack

# API methods for keeping cloud status and appengine db in sync via fastner box
class InstanceTenderHandler(BaseHandler):
    def get(self):
        try:
            # update list of instances we have
            http = httplib2.Http()
            url = '%s/api/instance/list?token=%s' % (config.fastener_host_url, config.fastener_api_token)

            response, content = http.request(url, 'GET')

            # list of instance from google cloud (see ./fastener/sample-output.json)
            finstances = json.loads(content)

            for finstance in finstances:
                # only look at instances with button in them
                if 'button' in finstance['name']:
                    instance = Instance.get_by_name(finstance['name'])
                    if instance:
                        try:
                            instance.ip = finstance['networkInterfaces'][0]['accessConfigs'][0]['natIP']
                        except:
                            instance.ip = "None"

                        instance.status = finstance['status']
                        instance.put()
                    else:
                        slack.slack_message("Instance %s found, but no record in database exists for it." % finstance['name'])

            # list of instances from db
            instances = Instance.get_all()

            for instance in instances:
                name = instance.name

                for finstance in finstances:
                    if name == finstance['name']:
                        # found a match
                        break
                else:
                    # only delete if instance create time is greater than 30 minutes...
                    if instance.created < datetime.datetime.now() - datetime.timedelta(0, 300):
                        slack.slack_message("DELETING instance %s's record from database. No instance found on Google Cloud." % name)
                        instance.key.delete()
                    else:
                        slack.slack_message("WAITING to delete instance %s's record from database. No instance found on Google Cloud." % name)

        except Exception as ex:
            print "yeah, no: %s" % ex
            pass

        return self.render_template('instance/tender.html')


class StreamsStarterHandler(BaseHandler):
    @user_required
    def get(self, sid):
        # know the user
        user_info = User.get_by_id(long(self.user_id))

        # look up user's instances
        db_instances = Instance.get_all()

        # check the user's limits
        instance_count = 0
        for db_instance in db_instances:
            # limit to instances the user has started
            if db_instance.user == user_info.key:
                instance_count = instance_count + 1

        # warn and redirect if limit is reached
        if (instance_count + 1) > user_info.max_instances:
            self.add_message('Instance limit reached. This account may only start %s instances. Please delete an existing instance to start a new one!' % user_info.max_instances, 'warning')
            return self.redirect_to('instances-list')

        # get stream
        stream = Stream.get_by_sid(sid)

        # make the instance call to the control box
        http = httplib2.Http(timeout=10)
        url = '%s/api/stream/%s?token=%s' % (config.fastener_host_url, sid, config.fastener_api_token)
        
        if config.debug: 
            print url

        # pull the response back TODO add error handling
        response, content = http.request(url, 'POST', None, headers={})
        finstance = json.loads(content)
        name = finstance['instance']

        # set up an instance 
        instance = Instance(
            name = name,
            status = "PENDING",
            user = user_info.key,
            stream = stream.key,
            expires = datetime.datetime.now() + datetime.timedelta(0, 86400), # + 1 day
        )
        instance.put()

        slack.slack_message("Instance type %s created for %s!" % (stream.name, user_info.username))

        # give the db a second to update
        time.sleep(1)

        self.add_message('Instance created! Grab some coffee and wait for %s to start.' % stream.name, 'success')

        params = {'name': name}
        return self.redirect_to('instance-detail', **params)


# list of a user's instances
class InstancesListHandler(BaseHandler):
    @user_required
    def get(self):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up user's instances
        db_instances = Instance.get_all()

        # work around index warning/errors using a .filter() in models.py
        instances = []
        for db_instance in db_instances:
            # limit to instances the user has started
            if db_instance.user == user_info.key:
                instances.append(db_instance)


        params = {
            'instances': instances,
            'user_id': self.user_id
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

        if not instance:
            params = {}
            return self.redirect_to('instances-list', **params)

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

        # look up user's instances
        db_instances = Instance.get_all()

        # check the user's limits
        instance_count = 0
        for db_instance in db_instances:
            # limit to instances the user has started
            if db_instance.user == user_info.key:
                instance_count = instance_count + 1

        # warn and redirect if limit is reached
        if (instance_count + 1) > user_info.max_instances:
            self.add_message('Instance limit reached. This account may only start %s instances. Please delete an existing instance to start a new one!' % user_info.max_instances, 'warning')
            return self.redirect_to('instances-list')

        # make the instance call to the control box
        http = httplib2.Http(timeout=10)
        url = '%s/api/stream/%s?token=%s' % (config.fastener_host_url, sid, config.fastener_api_token)
        
        if config.debug: 
            print url

        # pull the response back TODO add error handling
        response, content = http.request(url, 'POST', None, headers={})
        finstance = json.loads(content)
        name = finstance['instance']

        # set up an instance 
        instance = Instance(
            name = name,
            status = "PENDING",
            user = user_info.key,
            stream = stream.key,
            expires = datetime.datetime.now() + datetime.timedelta(0, 86400), # + 1 day
        )
        instance.put()

        slack.slack_message("Instance type %s created for %s!" % (stream.name, user_info.username))

        # give the db a second to update
        time.sleep(1)

        self.add_message('Instance created! Grab some coffee and wait for %s to start.' % stream.name, 'success')

        params = {'name': name}
        return self.redirect_to('instance-detail', **params)


    @webapp2.cached_property
    def form(self):
        return forms.InstanceForm(self)
