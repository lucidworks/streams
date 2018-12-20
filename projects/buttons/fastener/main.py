from google.auth import compute_engine
from googleapiclient import discovery
from bottle import Bottle, route, run, template, response, request, redirect, error
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
compute = discovery.build('compute', 'v1', credentials=credentials)
compute_beta = discovery.build('compute', 'beta', credentials=credentials)
project = 'labs-209320'

# regions & zones
regions = ['central1', 'west1', 'west2', 'east4'] # numbered 0, 1, 2, etc. in name
zones = ['a', 'b', 'c']

# app
app = Bottle(__name__)

# let's not screw around with other requests
@error(404)
def error404(error):
    client_ip = request.environ.get('REMOTE_ADDR')
    redirect("http://%s/fyuta" % client_ip  )

# redirect elsewhere
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
        items = []
        for r in regions:
            for z in zones:
                for x in range(3):
                    try:
                        result = compute.instances().list(
                            project=project,
                            zone='us-%s-%s' % (r, z)
                        ).execute()
                        break
                    except Exception as ex:
                        print ex
                        print "sleeping..."
                        time.sleep(3)
                        print "waking..."
                        
                try:
                    for item in result['items']:
                        items.append(item)
                except:
                    print "us-%s-%s has no instances" % (r, z)
        return dumps(items)
    except:
        # except Exception as ex:
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

    regionint = instance_id[-2]
    zonealpha = instance_id[-1]

    try:
        result = compute.instances().getSerialPortOutput(
            project=project,
            zone='us-%s-%s' % (regions[regionint], zonealpha),
            instance=instance_id
        ).execute()
    except Exception as ex:
        result = {}
        print "console probably not ready, but here's the actual error: %s" % ex
    return dumps(result)


@app.route('/api/instance/<instance_id>/stop', method='GET')
def stop(instance_id):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})
    except:
        return dumps({'error': "need token"})
    regionint = instance_id[-2]
    zonealpha = instance_id[-1]
    result = compute.instances().stop(
        project=project,
        zone='us-%s-%s' % (regions[regionint], zonealpha),
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
    regionint = instance_id[-2]
    zonealpha = instance_id[-1]
    try:
        result = compute.instances().delete(
            project=project,
            zone='us-%s-%s' % (regions[regionint], zonealpha),
            instance=instance_id
        ).execute()
    except Exception as ex:
        print "error: %s" % ex
    return dumps(result)


@app.route('/api/instance/<instance_id>/restart', method='GET')
def restart(instance_id):
    # token
    try:
        if request.query['token'] != token:
            return dumps({'error': "need token"})
    except:
        return dumps({'error': "need token"})
    regionint = instance_id[-2]
    zonealpha = instance_id[-1]
    result = compute.instances().reset(
        project=project,
        zone='us-%s-%s' % (regions[regionint], zonealpha),
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
    regionint = instance_id[-2]
    zonealpha = instance_id[-1]
    try:
        result = compute.instances().start(
            project='project',
            zone='us-%s-%s' % (regions[regionint], zonealpha),
            instance=instance_id
        ).execute()
    except Exception as ex:
        print "error: %s" % ex
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

    # random region/zone from regions/zones arrays above
    zonealpha = random.choice('abc')
    regionint = random.randint(0,1,2,3)

    # check to see which zone we can use
    request = service.zones().list(project=project)

    # name and machine type
    iid = id_generator()
    name = 'button-%s-%s%s%s' % (stream_slug, iid, regionint, zonealpha) # use the int, not the name of region
    password = ""
    while not bool(re.search(r'\d', password)):
        password = password_generator()
    config = {
        'name': name,
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
            "sourceImage": "projects/ubuntu-os-cloud/global/images/ubuntu-1604-xenial-v20181204",
            "diskType": "projects/%s/zones/us-%s-%s/diskTypes/pd-ssd" % (project, regions[regionint], zonealpha),
            "diskSizeGb": "100"
        }
    }]
    # service account
    config["serviceAccounts"] = [{
        "email": "%s@appspot.gserviceaccount.com" % project,
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
    # execute the query
    try:
        config['machineType'] = "zones/us-%s-%s/machineTypes/n1-standard-4" % (regions[regionint], zonealpha)
        operation = compute.instances().insert(
            project=project,
            zone='us-%s-%s' % (regionint, zonealpha),
            body=config
        ).execute()
        print operation
    except Exception as ex:
        name = "failed"
        password = "failed"
    response.content_type = 'application/json'
    return dumps({'instance': name, 'password': password})

# start off
app.run(server='paste', host='0.0.0.0', port=80, debug=True)
