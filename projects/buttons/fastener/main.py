from google.auth import compute_engine
import googleapiclient.discovery
from bottle import route, run, template, Bottle, response
from json import dumps
import random
import string
import sys
def id_generator(size=4, chars=string.ascii_lowercase + string.digits):return ''.join(random.choice(chars) for _ in range(size))
credentials = compute_engine.Credentials()
compute = googleapiclient.discovery.build('compute', 'v1')
app = Bottle(__name__)
@app.route('/')
def main():
    return template('main')
@app.route('/api/instance/list', method='GET')
def list():
    pass
@app.route('/api/instance/<instance_id>/stop', method='GET')
def stop():
    print instance_id
    pass
@app.route('/api/instance/<instance_id>/restart', method='GET')
def restart():
    print instance_id
    pass
@app.route('/api/instance/<instance_id>/start', method='GET')
def start():
    print instance_id
    pass
@app.route('/api/stream/<stream_slug>', method='POST') 
def create(stream_slug='lou'):

    # config
    iid = id_generator()
    config = {
        'name': 'button-%s-%s' % (stream_slug, iid), 
        'machineType': "zones/us-west1-c/machineTypes/n1-standard-4" 
    }

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

    config["serviceAccounts"] = [{
        "email": "labs-209320@appspot.gserviceaccount.com",
        "scopes": [
            "https://www.googleapis.com/auth/devstorage.read_only",
            "https://www.googleapis.com/auth/servicecontrol",
            "https://www.googleapis.com/auth/service.management.readonly",
        ]
    }]

    config['tags'] = { 'items': ["fusion"] }
    config['labels'] = { 'type': "button", 'sid': stream_slug, 'iid': iid }

    config['networkInterfaces'] =  [{
                'network': 'global/networks/default',
                'accessConfigs': [
                        {'type': 'ONE_TO_ONE_NAT', 'name': 'External NAT'}
                ]
    }]

    config["metadata"] = {
        "items": [{
                "key": "startup-script-url",
                "value": "https://raw.githubusercontent.com/lucidworks/streams/master/projects/buttons/fastener/scripts/start-button.sh"
        }]
    }

    operation = compute.instances().insert(
        project='labs-209320',
        zone='us-west1-c',
        body=config
    ).execute()
    print operation

    response.content_type = 'application/json'
    return dumps({'instance': "foo"})

# start off
app.run(host='0.0.0.0', port=8080, debug=True)
