from google.auth import compute_engine
import googleapiclient.discovery
from bottle import Bottle, route, run, template, response, request, redirect
from json import dumps
import random
import string
import sys
import os
import time
import re

def id_generator(size=4, chars=string.ascii_lowercase + string.digits):return ''.join(random.choice(chars) for _ in range(size))
def password_generator(size=12, chars=string.ascii_lowercase + string.digits):return ''.join(random.choice(chars) for _ in range(size))

# get the token
import httplib2
http = httplib2.Http()
url = 'http://metadata.google.internal/computeMetadata/v1/instance/tags'
headers = {'Metadata-Flavor': 'Google'}
response, content = http.request(url, 'GET', headers=headers)
evalcontent = eval(content)
for item in evalcontent:
        if 'token' in item:
                key,token = item.split('-')
if not token:
        sys.exit()

# google creds
credentials = compute_engine.Credentials()
compute = googleapiclient.discovery.build('compute', 'v1')

# app
app = Bottle(__name__)

@app.route('/')
def main():
    redirect("https://lucidworks.com/labs")

@app.route('/api/instance/list', method='GET')
def list():
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})

    except:
        return dumps({'error': "need token"})

    try:
        result = compute.instances().list(
            project='labs-209320',
            zone='us-west1-c'
        ).execute()
        return dumps(result['items'])

    except Exception as ex:
        print "error: %s" % ex
        return dumps([])


@app.route('/api/instance/<instance_id>/console', method='GET')
def console(instance_id):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})

    except:
        return dumps({'error': "need token"})

    result = compute.instances().getSerialPortOutput(
        project='labs-209320',
        zone='us-west1-c',
        instance=instance_id
    ).execute()

    return dumps(result)


@app.route('/api/instance/<instance_id>/stop', method='GET')
def stop(instance_id):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})

    except:
        return dumps({'error': "need token"})

    result = compute.instances().stop(
        project='labs-209320',
        zone='us-west1-c',
        instance=instance_id
    ).execute()

    return dumps(result)

@app.route('/api/instance/<instance_id>/delete', method='GET')
def delete(instance_id):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})

    except:
        return dumps({'error': "need token"})

    result = compute.instances().delete(
        project='labs-209320',
        zone='us-west1-c',
        instance=instance_id
    ).execute()

    return dumps(result)

@app.route('/api/instance/<instance_id>/restart', method='GET')
def restart(instance_id):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})

    except:
        return dumps({'error': "need token"})

    result = compute.instances().reset(
        project='labs-209320',
        zone='us-west1-c',
        instance=instance_id
    ).execute()

    return dumps(result)

@app.route('/api/instance/<instance_id>/start', method='GET')
def start(instance_id):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})

    except:
        return dumps({'error': "need token"})

    result = compute.instances().start(
        project='labs-209320',
        zone='us-west1-c',
        instance=instance_id
    ).execute()

    return dumps(result)

@app.route('/api/stream/<stream_slug>', method='POST')
def create(stream_slug='lou'):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})
    except:
        return dumps({'error': "need token"})

    try:
        user = request.query['user']
    except:
        user = "prod-unknown"

    # name and machine type
    iid = id_generator()
    name = 'button-%s-%s' % (stream_slug, iid)
    password = ""

    while not bool(re.search(r'\d', password))
        password = password_generator()

    config = {
        'name': name,
        'machineType': "zones/us-west1-c/machineTypes/n1-standard-4",
        'scheduling':
        {
            'preemptible': True
        }
    }

    # boot disk and type
    config['disks'] = [{
        'boot': True,
        'type': "PERSISTENT",
        'autoDelete': True,
        'initializeParams': {
            "sourceImage": "projects/ubuntu-os-cloud/global/images/ubuntu-1604-xenial-v20180627",
            "diskType": "projects/labs-209320/zones/us-west1-c/diskTypes/pd-ssd",
            "diskSizeGb": "100"
        }
    }]

    # service account
    config["serviceAccounts"] = [{
        "email": "labs-209320@appspot.gserviceaccount.com",
        "scopes": [
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/servicecontrol",
            "https://www.googleapis.com/auth/service.management.readonly",
        ]
    }]

    # tags ad labels
    config['tags'] = { 'items': ["fusion"] }
    config['labels'] = { 'type': "button", 'sid': stream_slug, 'iid': iid, 'password': password, 'user': user}

    # network interface
    config['networkInterfaces'] = [{
        'network': 'global/networks/default',
        'accessConfigs': [
            {'type': 'ONE_TO_ONE_NAT', 'name': 'External NAT'}
        ]
    }]

    # metadata
    config["metadata"] = {
        "items": [
        {
            "key": "startup-script-url",
            "value": "https://raw.githubusercontent.com/lucidworks/streams/master/projects/buttons/fastener/scripts/start-button.sh"
        },
        {
            "key": "password",
            "value": password
        }]
    }

    try:
        operation = compute.instances().insert(
            project='labs-209320',
            zone='us-west1-c',
            body=config
        ).execute()
    except:
        try:
            time.sleep(5)
            operation = compute.instances().insert(
                project='labs-209320',
                zone='us-west1-b',
                body=config
            ).execute()
        except:
            name = "failed"
            password = "failed"

    response.content_type = 'application/json'
    return dumps({'instance': name, 'password': password})

# start off
app.run(server='paste', host='0.0.0.0', port=80, debug=True)
