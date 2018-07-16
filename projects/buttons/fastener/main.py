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
image_response = compute.images().getFromFamily(project='debian-cloud', family='debian-8').execute()
source_disk_image = image_response['selfLink']
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
    config = {
        'name': 'button-%s-%s' % (stream_slug, id_generator()), 
        'machineType': "zones/us-west1-c/machineTypes/n1-standard-1" 
    }
    config['disks'] = [{
                'boot': True,
                'autoDelete': True,
                'initializeParams': {
                        'sourceImage': source_disk_image,
                }
    }]

    config['networkInterfaces'] =  [{
                'network': 'global/networks/default',
                'accessConfigs': [
                        {'type': 'ONE_TO_ONE_NAT', 'name': 'External NAT'}
                ]
    }]

    config["metadata"] = {
        "items": [{
                "key": "startup-script-url",
                "value": "gs://buttons-streams/start-button.sh"
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
