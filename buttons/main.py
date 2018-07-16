from google.auth import compute_engine
import googleapiclient.discovery
from bottle import route, run, template
import random
import string
import sys

def id_generator(size=4, chars=string.ascii_lowercase + string.digits):return ''.join(random.choice(chars) for _ in range(size))

credentials = compute_engine.Credentials()
compute = googleapiclient.discovery.build('compute', 'v1')

image_response = compute.images().getFromFamily(project='debian-cloud', family='debian-8').execute()
source_disk_image = image_response['selfLink']

@route('/')
def main():
    return template('main')


@route('/api/instance/list', methods=['GET'])
def list():
    pass


@route('/api/instance/<instance_id>/stop', methods=['GET'])
def stop():
    pass


@route('/api/instance/<instance_id>/restart', methods=['GET'])
def restart():
    pass


@route('/api/instance/<instance_id>/start', methods=['GET'])
def start():
    pass


@route('/api/stream/<stream_slug>', methods=['POST'])
def create():

    # config
    config = {
        'name': 'button-%s-%s' % (stream_slug, id_generator()), 
        'machineType': "zones/us-west1-b/machineTypes/n1-standard-1" 
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

    operation = compute.instances().insert(
        project='labs-209320',
        zone='us-west1-c',
        body=config
    ).execute()

    print operation

    return template('start')

# start off
run(host='0.0.0.0', port=8080, debug=True)

