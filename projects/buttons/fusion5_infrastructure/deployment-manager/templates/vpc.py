
def create_vpc(env, properties):
    return [{
        "name": properties['vpc_name'],
        "type": "compute.v1.network",
        "properties": {
            "description": "A VPC designed to deploy a GKE cluster for the Lucidworks stream application",
            "autoCreateSubnetworks": False
        }
    }]

def create_subnets(env, properties):
    return [{
        "name": "%s-public" % (properties['vpc_name']),
        "type": "compute.v1.subnetwork",
        "properties":{
            "network": "$(ref.%s.selfLink)" % (properties['vpc_name']),
            "ipCidrRange": "10.0.0.0/16",
            "region": properties['region'],
            "privateIpGoogleAccess": properties['privateIpGoogleAccess']
        }
    }]

def create_router(env, properties):
    return [{
        "name": "%s-nat-gateway" % (properties['vpc_name']),
        "type": "compute.beta.router",
        "properties": {
            "description": "NAT gateway",
            "network": "$(ref.%s.selfLink)" % (properties['vpc_name']),
            "region": properties["region"],
            "nats": [{
                "name": "%s-nat" % (properties['vpc_name']),
                "natIpAllocateOption": "AUTO_ONLY",
                "minPortsPerVm": 64,
                "sourceSubnetworkIpRangesToNat": "ALL_SUBNETWORKS_ALL_IP_RANGES"
                # "subnetworks": [{
                #     "name": "projects/%s/regions/%s/subnetworks/public-subnet" % (env['project'], properties['region']),
                #     "sourceIpRangesToNat": [
                #         "ALL_IP_RANGES"
                #     ]
                # }]
            }]
        }
    }]

def create_firewall_rules(env, properties):
    return [{
        "name": "%s-allow-all" % (properties['vpc_name']),
        "type": "compute.v1.firewall",
        "properties": {
            "network": "$(ref.%s.selfLink)" % (properties['vpc_name']),
            "name": "%s-allow-internal" % (properties['vpc_name']),
            "direction": "INGRESS",
            "sourceRanges": [
                "10.0.0.0/8"
            ],
            "priority": 65534,
            "allowed": [{
                "IPProtocol": "all"
            }]
        }
    },{
        "name": "%s-allow-cert-manager" % (properties['vpc_name']),
        "type": "compute.v1.firewall",
        "properties": {
            "network": "$(ref.%s.selfLink)" % (properties['vpc_name']),
            "name": "%s-allow-internal" % (properties['vpc_name']),
            "direction": "INGRESS",
            "sourceRanges": [
                "172.16.0.0/28"
            ],
            "priority": 65534,
            "allowed": [{
                "IPProtocol": "tcp",
                "ports": [
                    6443
                ]
            }]
        }
    }]

def generate_config(context):
    env = context.env
    properties = context.properties
    resources = []
    resources += create_vpc(env, properties)
    resources += create_subnets(env, properties)
    resources += create_router(env, properties)
    resources += create_firewall_rules(env, properties)
    return {
        "resources": resources,
        "outputs": [{
            "name": "vpc_id",
            "value": "$(ref.%s.selfLink)" % (properties['vpc_name'])
        },{
            "name": "public_subnet_id",
            "value": "$(ref.%s.selfLink)" % ("%s-public" % properties['vpc_name'])
        }]
    }
