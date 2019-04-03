from datetime import datetime

from web.models.models import Instance
from web.models.models import Appliance
from web.models.models import Image
from web.models.models import Flavor


# translate the structure that comes from the API into the local instance model
class InstanceApiShim(object):

	def __init__(self, instance):
		self.instance = instance

	# handle setting of complex properties, each in their correct way
	def __setattr__(self, key, val):
		complex_properties = {
			'flavor': 'self.prepare_flavor(val)',
			'image': '[("image", Image.get_by_name(val["name"]).key),]',
			'appliance': 'self.prepare_appliance(val)',
			'ip_addresses': 'self.prepare_ip_addresses(val)',
			'console_output': 'self.prepare_console_output(val)',
		}
		if key == "instance":
			super(InstanceApiShim, self).__setattr__(key, val)
		elif key not in complex_properties.keys():
			setattr(self.instance, key, val)
		else:
			for (k, v) in eval(complex_properties[key]):
				setattr(self.instance, k, v)

	# extract data that we need from the appliance to copy it to instance
	def prepare_appliance(self, val):
		appliance = Appliance.get_by_token(val.token)
		return [
			('appliance', appliance.key),
			('owner', appliance.owner),
			('group', appliance.group),]

	# get flavor by merging specs and copy flavor asking price to instance.ask
	def prepare_flavor(self, flavor_specs):
		flavor = Flavor.get_by_merge(**flavor_specs)
		return [
			('flavor', flavor.key),
			('ask', flavor_specs['ask']),]

	def prepare_console_output(self, console_lines):
		return [('console_output', '\n'.join([x.as_dict() for x in console_lines])),]

	# change the more flexible structure from the API scheme into the local model
	def prepare_ip_addresses(self, addresses):
		processed = []
		for address in addresses:
			if address.version.as_dict() == 4 and address.scope.as_dict() == 'private':
				processed.append(('ipv4_private_address', address.address.as_dict()))
			if address.version.as_dict() == 6 and address.scope.as_dict() == 'public':
				processed.append(('ipv6_address', address.address.as_dict()))
			if address.version.as_dict() == 4 and address.scope.as_dict() == 'public':
				processed.append(('ipv4_address', address.address.as_dict()))
		return processed

	def get_instance(self):
		return self.instance

	def put(self):
		self.instance.put()
