# standard library imports
import logging, os
import urllib, urllib2, httplib2
import hashlib, json
import time, datetime
import re

from lib.dateutil import parser as DUp

import webapp2

import config
import web.forms as forms
from web.basehandler import BaseHandler
from web.basehandler import user_required, admin_required
from web.models.models import User, Instance, Stream
from lib import slack
from lib import utils

from lib.marketorestpython.client import MarketoClient

# method for keeping hot starts running
class InstanceHotStartsHandler(BaseHandler):
    def get(self):
        # list of streams from db
        streams = Stream.get_all()

        # get list of host start instances from db
        instances = Instance.get_hotstarts()

        # for return of started/deleted instances
        sinstances = []
        dinstances = []

        # blast old ones
        for instance in instances:
            fiveminutesago = datetime.datetime.now() - datetime.timedelta(0, 14400) # not five minutes, people
            if instance.created < fiveminutesago:
                # this instance is SO less (older) than some epoch seconds ago ^
                dinstances.append(instance)
                instance.key.delete()
                slack.slack_message("Hotstart instance %s deleted for being at risk for preemption!" % instance.name)
            if instance.status == "TERMINATED":
                # if this instance was started and then preempted
                dinstances.append(instance)
                instance.key.delete()
                slack.slack_message("Hotstart instance %s deleted due to being terminated!" % instance.name)

        # for return of started instances
        sinstances = []

        # loop over the 'templates' (streams)
        for stream in streams:
            running = 0

            # check to see if some are running
            for instance in instances:
                if instance.stream.get().sid == stream.sid:
                    running = running + 1

            try:
                hot_starts = stream.hot_starts
            except:
                hot_starts = 0

            try:
                size = stream.instance_size
            except:
                size = 0

            if running < hot_starts:
                # start up an extra instance for this stream (max starts 1 per minute per template)
                # make the instance call handler
                http = httplib2.Http(timeout=10)

                # where and who created it (labels for google cloud console)
                if config.isdev:
                    iuser = "%s-%s" % ("dev", "hotstart")
                else:
                    iuser = "%s-%s" % ("prod", "hotstart")

                # build url to call create new instance from stream on fastener box (our instance)
                url = '%s/api/stream/%s?token=%s&user=%s&size=%s' % (
                    config.fastener_host_url,
                    stream.sid,
                    config.fastener_api_token,
                    iuser,
                    size
                )

                try:
                    # pull the response back TODO add more better error handling
                    response, content = http.request(url, 'POST', None, headers={})
                    gcinstance = json.loads(content)
                    name = gcinstance['instance']
                    password = gcinstance['password']

                    if name == "failed":
                        raise Exception("Instance start failed.")

                    # set up an instance
                    instance = Instance(
                        name = name,
                        status = "PROVISIONING",
                        stream = stream.key,
                        size = size,
                        hotstart = True,
                        password = password,
                        expires = datetime.datetime.now() + datetime.timedelta(0, 604800),
                        started = datetime.datetime.now()
                    )
                    instance.put()

                    # for return
                    sinstances.append(instance)

                    slack.slack_message("Instance type %s created for HOTSTART!" % stream.name)
                except Exception as ex:
                    print ex

        params = {"sinstances": sinstances, "dinstances": dinstances}

        self.response.headers['Content-Type'] = "application/json"
        return self.render_template('api/hotstarts.json', **params)


# methods for keeping cloud status and appengine db in sync via fastner box API
class InstanceTenderHandler(BaseHandler):
    def get(self):
        try:
            # grab a list of instances from the Fastener API
            http = httplib2.Http(timeout=30)
            url = '%s/api/instance/list?token=%s' % (config.fastener_host_url, config.fastener_api_token)
            response, content = http.request(url, 'GET')

            # list of instances from Google Cloud (see ./fastener/sample-output.json)
            gcinstances = json.loads(content)

            if len(gcinstances) > 0:
                message = "ok"
            else:
                message = "no instances were returned from fastener API"

        except Exception as ex:
            gcinstances = []
            slack.slack_message("Tender::Exception with list query to fastener box.")
            message = "failed to contact fastener API"

        # list of instances from db
        instances = Instance.get_all()

        # bail if we didn't get any instances from Google
        if len(gcinstances) == 0:
            params = {
                "message": message,
                "gc_count": len(gcinstances),
                "db_count": len(instances)
            }

            slack.slack_message("Tender::No instances from Google?")

            self.response.headers['Content-Type'] = "application/json"
            return self.render_template('api/tender.json', **params)
            ######

        # loop through list of instances in local or production DB
        for instance in instances:
            name = instance.name
            found = False

            # loop through the instances we got from google
            for gcinstance in gcinstances:

                # check if the names match
                if name == gcinstance['name']:
                    # got a match
                    found = True

                    try:
                        # grab the IP address and status
                        instance.ip = gcinstance['networkInterfaces'][0]['accessConfigs'][0]['natIP']
                    except:
                        # got limited or no data about instance
                        instance.ip = "None"

                    # leave commented out
                    slack.slack_message("Tender::%s has status %s" % (instance.name, instance.status))

                    # if not BUILDING then update status right from google
                    if instance.status not in ("BUILDING"):
                        instance.status = gcinstance['status']

                    # at this point if the instance.status is NOT BUILDING, then we grab
                    # whatever google says the instance is doing. if it's RUNNING, then
                    # we do an instance link test to ensure the fusion service is running
                    # if Fusion does not respond, we set it to CONFIGURING

                    # BUILDING state is kept until an update of BUILDING state is done
                    # see APIs

                    # are we running?
                    if instance.status == "RUNNING":
                        # check if the box is running fusion admin yet (CONFIGURING if NOT)
                        try:
                            # fast fail connection for checking if fusion is up
                            http_test = httplib2.Http(timeout=2)
                            test_url = 'http://%s:8764' % instance.ip
                            response, content = http_test.request(test_url, 'GET')
                            test_status = response['status']
                        except:
                            slack.slack_message("Tender::%s FAILED Fusion port test." % (instance.name))
                            test_status = "404"

                        # set admin_link if box is running and test comes back 200
                        if test_status == "200":
                            instance.admin_link = test_url

                            # build app link and update, if it exists
                            try:
                                if instance.stream.get().app_stub:
                                    app_stub = instance.stream.get().app_stub
                                    instance.app_link = "http://%s%s" % (instance.ip, app_stub)
                                else:
                                    instance.app_link = None
                            except:
                                instance.app_link = None

                        else:
                            # show the box is in CONFIGURING
                            instance.status = "CONFIGURING"
                            instance.admin_link = None
                            instance.app_link = None
                            instance.put()

                    else: # NOT RUNNING STATUS (FROM GOOGLE) OR BUILDING (FROM DEPLOY SCRIPT)
                        # should we start it?
                        if instance.tender_action == "START":
                            # try to start it
                            http = httplib2.Http(timeout=10)
                            url = '%s/api/instance/%s/start?token=%s' % (
                                config.fastener_host_url,
                                name,
                                config.fastener_api_token
                            )
                            try:
                                # pull the response back TODO add error handling
                                response, content = http.request(url, 'GET', None, headers={})

                                # update if google returns pending
                                if json.loads(content)['status'] == "PENDING" or json.loads(content)['status'] == "DONE":
                                    params = {"response": "success", "message": "instance %s started" % name }
                                    instance.status = "PROVISIONING"
                                    instance.tender_action = "NONE"
                                    instance.started = datetime.datetime.now()
                                    instance.put()

                                    slack.slack_message("Tender::%s wanted and got a START" % (instance.name))
                                else:
                                    slack.slack_message("Tender::%s wanted START but google reported %s" % (instance.name, json.loads(content)['status']))

                            except Exception as ex:
                                slack.slack_message("Tender::Exception %s with %s" % (ex, instance.name))

                        else:
                            # slack.slack_message("Tender::%s not requesting any actions." % instance.name)
                            pass

                    # instance has been terminated
                    if instance.status == "TERMINATED":
                        # set start time to far in the past
                        instance.started = instance.created - datetime.timedelta(0, 604800)

                    # make sure we write all changes out
                    instance.put()
                    break # no need to keep looking

                else:
                    # instance doesn't match the one we're working on
                    pass

            if not found:
                # box wasn't found on GCP (via fastener LIST call)
                slack.slack_message("Instance %s noted not being on GCP - looking" % name)

                http = httplib2.Http(timeout=10)
                url = '%s/api/instance/%s/status?token=%s' % (
                    config.fastener_host_url,
                    name,
                    config.fastener_api_token
                )

                # pull the response back
                response, content = http.request(url, 'GET', None, headers={})

                result = json.loads(content)
                if not result:
                    # we could not verify box was or wasn't running (fastener might not be running)
                    slack.slack_message("Can't tell what is going on.")
                    pass
                else:
                    try:
                        if result['error'] == "NOTFOUND":
                            slack.slack_message("Deleting instance %s from DB for not being on GCP." % name)
                            instance.key.delete()
                    except:
                        # no error
                        # why are we here, we got a response this box is running
                        pass

        else:
            # no instances in db
            pass

        # cleanup stray and EOL instances
        for gcinstance in gcinstances:
            instance = Instance.get_by_name(gcinstance['name'])

            if instance:
                name = instance.name

                # if instance is expired, end it
                if instance.expires < datetime.datetime.now():
                    # make the instance call to the control box
                    try:
                        http = httplib2.Http(timeout=10)
                        url = '%s/api/instance/%s/delete?token=%s' % (
                            config.fastener_host_url,
                            name,
                            config.fastener_api_token
                        )

                        # pull the response back
                        response, content = http.request(url, 'GET', None, headers={})
                        if content['status'] == "PENDING":
                            instance.key.delete()
                            slack.slack_message("DELETING instance %s's from GCP because expired." % name)

                    except:
                        slack.slack_message("ERROR: failed deleting instance %s's from GCP because expired." % name)

            else:
                # instance wasn't found in db
                name = gcinstance['name']

                # make sure we don't delete non-demo or prod instances
                if 'button' in name and config.isdev == False: # i.e. put 'button' in an instance name & this will delete the instance
                    slack.slack_message("Not found in DB. Will try to delete instance %s's from Google Cloud." % name)

                    # make the instance call to the control box
                    # THIS IS THE DANGEROUS BITS
                    try:
                        http = httplib2.Http(timeout=10)
                        url = '%s/api/instance/%s/delete?token=%s' % (
                            config.fastener_host_url,
                            name,
                            config.fastener_api_token
                        )

                        # pull the response back
                        response, content = http.request(url, 'GET', None, headers={})

                        if content['status'] == "PENDING":
                            slack.slack_message("DELETING instance %s's from Google Cloud." % name)
                        else:
                            slack.slack_message("ERROR: funky content returned while deleting instance %s's from Google Cloud." % name)

                    except:
                        slack.slack_message("ERROR: failed deleting instance %s from Google Cloud." % name)

        else:
            # no instances from cloud - this should never run
            pass

        params = {
            "message": message,
            "gc_count": len(gcinstances),
            "db_count": len(instances)
        }

        self.response.headers['Content-Type'] = "application/json"
        return self.render_template('api/tender.json', **params)
        ######


# handle an instance start by showing a non-authenticated dashboard page w/ a dialog
# if a user exists, forwards to next handler to start the instance
# /instance/create/<sid>
class StreamsStarterPage(BaseHandler):
    def get(self, sid=None):
        try:
            user_info = User.get_by_id(long(self.user_id))
            if user_info:
                self.redirect_to('streams-start3', sid=sid)
            else:
                raise Exception('No user.')
        except:
            pass

        params = {'dialog': True}
        return self.render_template('user/dashboard.html', **params)


# provide useful link to directly start an instance from another page
# /instance/create/<sid>/launch
# this method and the InstancesListHandler POST method use duplicated code (take care, needs to be refactored)
class StreamsStarterHandler(BaseHandler):
    @user_required
    def get(self, sid):
        # know the user
        user_info = User.get_by_id(long(self.user_id))

        # check if we have their email
        if not user_info.email:
            self.add_message('Please update your email address before starting an instance!', 'warning')
            return self.redirect_to('account-settings')

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

        try:
            size = stream.instance_size
        except:
            size = 0

        ## HOT START
        # check for a hot start
        instances = Instance.get_hotstarts()

        for instance in instances:

            # fiveminutesago depends on number of seconds at end of this     ***
            fiveminutesago = datetime.datetime.now() - datetime.timedelta(0, 900)

            # if this hotstart instance has a matching sid, assign and redirect to it
            if instance.created < fiveminutesago and instance.stream.get().sid == stream.sid and instance.status == "RUNNING":
                # map to user
                instance.user = user_info.key
                instance.hotstart = False
                instance.put()

                self.add_message('Instance assigned! Use login buttons to access %s.' % stream.name, 'success')
                slack.slack_message("Instance type %s assigned for %s!" % (stream.name, user_info.username))
                return self.redirect_to('instance-detail', name=instance.name)
        #
        ## TOH TRATS

        # make the instance call to the control box
        http = httplib2.Http(timeout=10)

        # where and who created it
        if config.isdev:
            iuser = "%s-%s" % ("dev", user_info.username)
        else:
            iuser = "%s-%s" % ("prod", user_info.username)

        url = '%s/api/stream/%s?token=%s&user=%s&size=%s' % (
            config.fastener_host_url,
            sid,
            config.fastener_api_token,
            iuser,
            size
        )

        try:
            # pull the response back TODO add error handling
            response, content = http.request(url, 'POST', None, headers={})
            gcinstance = json.loads(content)
            name = gcinstance['instance']
            password = gcinstance['password']

            if name == "failed":
                raise Exception("Instance start failed.")

            # set up an instance (note there are two ways to create an instance - see below)
            instance = Instance(
                name = name,
                status = "PROVISIONING",
                user = user_info.key,
                stream = stream.key,
                size = size,
                password = password,
                expires = datetime.datetime.now() + datetime.timedelta(0, 604800),
                started = datetime.datetime.now()
            )
            instance.put()
            slack.slack_message("Instance type %s created for %s!" % (stream.name, user_info.username))

            # give the db a second to update
            if config.isdev:
                time.sleep(1)

            self.add_message('Instance created! Give the system a few minutes to start %s.' % stream.name, 'success')

            params = {'name': name}
            return self.redirect_to('instance-detail', **params)


        except:
            self.add_message('The system is currently busy with other instances. Please try again in a few minutes.', 'warning')
            return self.redirect_to('instances-list')


# list of a user's instances and create new instance
# this method and the StreamsStarterHandler GET method use duplicated code (take care, needs to be refactored)
class InstancesListHandler(BaseHandler):
    @user_required
    def get(self, sid=None):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # redirect to a POST if we have a sid in the URL
        if sid and user_info.email:
            return self.post(sid)
        try:
            if not user_info.email or not user_info.name or not user_info.company:
                need_more_info = True
            else:
                need_more_info = False
        except:
            need_more_info = True

        # look up user's instances
        db_instances = Instance.get_all()

        # work around index warning/errors using a .filter() in models.py
        instances = []
        for db_instance in db_instances:
            # limit to instances the user has started
            if db_instance.user == user_info.key:
                if db_instance.renamed == None:
                    db_instance.renamed = ""
                instances.append(db_instance)

        streams = Stream.get_all()

        params = {
            'instances': instances,
            'num_instances': len(instances),
            'streams': streams,
            'user_id': self.user_id,
            'user_info': user_info,
            'sid': sid,
            'need_more_info': need_more_info
        }

        return self.render_template('instance/list.html', **params)

    @user_required
    def post(self, sid=None): # a POST here is a create instance event
        # know the user
        user_info = User.get_by_id(long(self.user_id))

        if sid and user_info.email:

            # get form values
            stream = Stream.get_by_sid(sid)

            try:
                size = stream.instance_size
            except:
                size = 0

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

            ## HOT START
            # check for a hot start
            instances = Instance.get_hotstarts()

            for instance in instances:
                # fiveminutesago depends on number of seconds at end of this     ***
                fiveminutesago = datetime.datetime.now() - datetime.timedelta(0, 900)

                # if this hotstart instance has a matching sid, assign and redirect to it
                if instance.created < fiveminutesago and instance.stream.get().sid == stream.sid and instance.status == "RUNNING":
                    # map to user
                    instance.user = user_info.key
                    instance.hotstart = False
                    instance.put()

                    self.add_message('Instance assigned! Use login buttons to access %s.' % stream.name, 'success')
                    slack.slack_message("Instance type %s assigned for %s!" % (stream.name, user_info.username))
                    return self.redirect_to('instance-detail', name=instance.name)
            #
            ## TRATS TOH

            # make the instance call handle
            http = httplib2.Http(timeout=100)

            # where and who created it (labels for google cloud console)
            if config.isdev:
                iuser = "%s-%s" % ("dev", user_info.username.lower())
            else:
                iuser = "%s-%s" % ("prod", user_info.username.lower())

            # build url to create new instance from stream
            url = '%s/api/stream/%s?token=%s&user=%s&size=%s' % (
                config.fastener_host_url,
                sid,
                config.fastener_api_token,
                iuser,
                size
            )
            try:
                # pull the response back TODO add error handling
                response, content = http.request(url, 'POST', None, headers={})
                gcinstance = json.loads(content)
                name = gcinstance['instance']
                password = gcinstance['password']

                if name == "failed":
                    raise Exception("Instance start failed.")

                is_alpha = re.compile("^[a-zA-Z]+$")

                # Fusion 5
                if is_alpha.match(name) and len(name) == 4:
                    # set up an instance
                    instance = Instance(
                        name = name,
                        ip = "http://" + name + ".streams.lucidworks.com",
                        status = "PROVISIONING",
                        user = user_info.key,
                        stream = stream.key,
                        size = size,
                        password = password,
                        expires = datetime.datetime.now() + datetime.timedelta(0, 604800),
                        started = datetime.datetime.now()
                        )

                    instance.put()
                    slack.slack_message("Instance type %s created for %s!" % (stream.name, user_info.username))
                    params = {'name': name}
                    return self.redirect_to('instance-detail', **params)
                # End Fusion 5

                #Legacy
                else:
                # set up an instance
                    instance = Instance(
                        name = name,
                        status = "PROVISIONING",
                        user = user_info.key,
                        stream = stream.key,
                        size = size,
                        password = password,
                        expires = datetime.datetime.now() + datetime.timedelta(0, 604800),
                        started = datetime.datetime.now()
                    )
                    instance.put()

                    slack.slack_message("Instance type %s created for %s!" % (stream.name, user_info.username))

                    # give the db a second to update
                    if config.isdev:
                        time.sleep(1)

                    self.add_message('Instance created! Grab some coffee and wait for %s to start.' % stream.name, 'success')

                    params = {'name': name}
                    return self.redirect_to('instance-detail', **params)
                # end Legacy

            except:
                self.add_message('The system is currently busy with other instances. Please try again in a few minutes.', 'warning')
                return self.redirect_to('instances-list')

        else:
            # email update sumbission
            if not self.form.validate():
                self.add_message("There were errors validating your email address.", "error")
                return self.get()

            email = self.form.email.data.strip()

            user_info = User.get_by_id(long(self.user_id))
            user_info.email = email.strip()
            user_info.put()

            if len(email) > 3 and not config.isdev:
                name = user_info.name
                try:
                    mc = MarketoClient(config.munchkin_id, config.mclient_id, config.mclient_secret)
                    try:
                        first = name.split()[0]
                    except:
                        first = ""

                    try:
                        last = name.split()[1]
                    except:
                        last = ""

                    try:
                        company = user_info.company
                    except:
                        company = "None"

                    leads = [{
                        "email": user_info.email,
                        "firstName": first,
                        "lastName": last,
                        "company": company,
                        "leadSource": config.mclient_leadSource
                    }]
                    lead = mc.execute(
                        method='push_lead',
                        leads=leads,
                        lookupField='email',
                        programName=config.mclient_programName,
                        programStatus=config.mclient_programStatus
                    )

                except Exception as ex:
                    slack.slack_message("Marketo lead create failed because %s." % ex)

            slack.slack_message("We got %s to update their email for instance launch!" % user_info.username)

            self.add_message("Thank you! Your email has been updated.", 'success')

            # redirect back to GET on list, but with a sid AND email in place this time to create
            if sid:
                return self.redirect_to('streams-start3', sid=sid)
            else:
                return self.redirect_to('instances-list')

    @webapp2.cached_property
    def form(self):
        return forms.EmailForm(self)


class InstanceControlHandler(BaseHandler):
    @user_required
    def get(self, name, command):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # get instance
        instance = Instance.get_by_name(name)

        if not instance:
            params = {}
            return self.redirect_to('instances-list', **params)
            slack.slack_message("request for an instance we can't find - SPAMSPAMSPAM")

        else:
            # check user owns it or user is admin
            if user_info.admin != True and long(instance.user.id()) != long(self.user_id):
                params = {"response": "failure", "message": "instance %s not modifiable by calling user" % name}
                self.response.set_status(500)
                slack.slack_message("%s doesn't own %s" % (user_info.username, name))

            else:
                # start the instance
                if command == "start" and instance.status != "RUNNING":
                    slack.slack_message("firing up %s" % instance.name)
                    try:
                        instance.started = datetime.datetime.now()
                        instance.tender_action = "START"
                        instance.put()

                        params = {"response": "success", "message": "Instance %s marked to be started." % instance.name }
                        slack.slack_message("updated db for %s with %s" % (instance.name, instance.tender_action))
                    except Exception as ex:
                        params = {"response": "failure", "message": "%s" % ex }

                    self.response.headers['Content-Type'] = "application/json"
                    return self.render_template('api/response.json', **params)

                # add ssh_key to instance
                elif command == "addkey":
                    # make the instance call to the control box
                    http = httplib2.Http(timeout=10)
                    url = '%s/api/instance/%s/addkey?token=%s&ssh_key=%s&username=%s' % (
                        config.fastener_host_url,
                        name,
                        config.fastener_api_token,
                        urllib.quote(user_info.ssh_key),
                        user_info.username
                    )

                    try:
                        # pull the response back TODO add error handling
                        response, content = http.request(url, 'GET', None, headers={})

                        # delete if google returns pending
                        if json.loads(content)['status'] == "SUCCESS":
                            params = {"response": "success", "message": "instance %s updated with key" % name }
                        else:
                            params = {"response": "failure", "message": "instance %s operation failure" % name }
                            response.set_status(500)
                    except:
                        params = {"response": "failure", "message": "instance %s failure" % name }

                    self.response.headers['Content-Type'] = "application/json"
                    return self.render_template('api/response.json', **params)

                # just the status
                elif command == "status":
                    params = {"instance": instance}
                    self.response.headers['Content-Type'] = "application/json"
                    return self.render_template('api/instance.json', **params)


                # delete the instance - C'est la vie
                elif command == "delete":
                    instance.key.delete() # let the tender script delete it
                    params = {"response": "success", "message": "Instance marked to be deleted." }

                    self.response.headers['Content-Type'] = "application/json"
                    return self.render_template('api/response.json', **params)

                # rename it
                elif command == "rename":
                    renamed = self.request.get('renamed')
                    instance.renamed = renamed
                    instance.put()

                    params = {"instance": instance}
                    self.response.headers['Content-Type'] = "application/json"
                    return self.render_template('api/instance.json', **params)

                else:
                    params = {"response": "failure", "message": "bad command, skippy" }
                    self.response.set_status(500)
                    self.response.headers['Content-Type'] = "application/json"
                    return self.render_template('api/response.json', **params)


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

        if instance.renamed == None:
            instance.renamed = "" # remap so template can address

        if instance.created < (datetime.datetime.now() - datetime.timedelta(0,600)):
            instance.expired = True
        else:
            instance.expired = False

        stream = Stream.get_by_id(instance.stream.id())

        if utils.read_cookie(self, "guide") == "closed":
            guide = False
        else:
            guide = True

        if instance.size == 1:
            instance_cores = 8
            instance_memory = 30
        elif instance.size == 2:
            instance_cores = 16
            instance_memory = 60
        else:
            instance_cores = 4
            instance_memory = 15

        params = {
            'guide': guide,
            'instance': instance,
            'stream': stream,
            'user_info': user_info,
            'instance_cores': instance_cores,
            'instance_memory': instance_memory
        }

        return self.render_template('instance/detail.html', **params)


# instance detail page
class InstanceConsoleHandler(BaseHandler):
    @user_required
    def get(self, name):
        # lookup user's auth info
        user_info = User.get_by_id(long(self.user_id))

        # look up user's instances
        instance = Instance.get_by_name(name)

        self.response.headers['Content-Type'] = "text/plain"

        if not instance:
            params = {"contents": "Waiting on serial console output..."}
            return self.render_template('instance/console.txt', **params)

        try:
            # update list of instances we have
            http = httplib2.Http()
            url = '%s/api/instance/%s/console?token=%s' % (config.fastener_host_url, name, config.fastener_api_token)
            response, content = http.request(url, 'GET')
            stuff = json.loads(content)

            params = {"contents": stuff['contents']}
        except Exception as ex:
            params = {"contents": "Waiting on serial console output..."}

        return self.render_template('instance/console.txt', **params)
