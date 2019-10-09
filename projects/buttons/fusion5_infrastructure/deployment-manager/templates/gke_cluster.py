

def generate_config(context):
    env = context.env
    properties = context.properties
    return {
        "resources":[{
            "name": properties["cluster_name"] + "-cluster",
            "type": "gcp-types/container-v1beta1:projects.locations.clusters",
            "properties": {
                "parent": "projects/%s/locations/%s" % (env["project"], properties["region"]),
                "cluster": {
                    "name": properties['cluster_name'],
                    "description": "GKE Cluster, created with deployment-manager",
                    "masterAuth": {
                        "clientCertificateConfig": {
                            "issueClientCertificate": False
                        }
                    },
                    "ipAllocationPolicy": {
                        "useIpAliases": True
                    },
                    "privateClusterConfig": {
                        "enablePrivateNodes": True,
                        "master_ipv4_cidr_block": "172.16.0.0/28"
                    },
                    "loggingService": "logging.googleapis.com",
                    "monitoringService": "monitoring.googleapis.com",
                    "network": properties["vpc_id"],
                    "subnetwork": properties["subnetwork"],
                    "addonsConfig": {
                        "httpLoadBalancing": {
                            "disabled": False
                        },
                        "kubernetesDashboard": {
                            "disabled": True
                        },
                        "horizontalPodAutoscaling": {
                            "disabled": False
                        }
                    },
                    "networkPolicy": {
                        "provider": "CALICO",
                        "enabled": True
                    },
                    "masterAuthorizedNetworksConfig": {
                        "enabled": True,
                        "cidrBlocks": [{
                            "displayName": "Everything",
                            "cidrBlock": "0.0.0.0/0"
                        }]
                    },
                    "initialClusterVersion": properties["cluster_version"],
                    "location": properties["region"],
                    "nodePools": [{
                        "name": "standard",
                        "config": {
                            "machineType": "n1-standard-8",
                            "diskSizeGb": 100,
                            "oauthScopes": [
                                "https://www.googleapis.com/auth/devstorage.read_only",
                                "https://www.googleapis.com/auth/logging.write",
                                "https://www.googleapis.com/auth/monitoring",
                                "https://www.googleapis.com/auth/servicecontrol",
                                "https://www.googleapis.com/auth/service.management.readonly",
                                "https://www.googleapis.com/auth/trace.append",
                                "https://www.googleapis.com/auth/compute",
                                "https://www.googleapis.com/auth/cloud-platform"
                            ],
                            "imageType": "COS",
                            "labels":{
                              "compute_type": "standard"
                            },
                            "diskType": "pd-standard"
                        },
                        "initialNodeCount": 1,
                        "autoscaling": {
                            "enabled": True,
                            "minNodeCount": 0,
                            "maxNodeCount": 10
                        },
                        "management": {
                            "autoUpgrade": True,
                            "autoRepair": True
                        },
                        "version": properties["cluster_version"]

                    },{
                        "name": "preemptible",
                        "config": {
                            "machineType": "n1-standard-8",
                            "diskSizeGb": 100,
                            "oauthScopes": [
                                "https://www.googleapis.com/auth/devstorage.read_only",
                                "https://www.googleapis.com/auth/logging.write",
                                "https://www.googleapis.com/auth/monitoring",
                                "https://www.googleapis.com/auth/servicecontrol",
                                "https://www.googleapis.com/auth/service.management.readonly",
                                "https://www.googleapis.com/auth/trace.append",
                                "https://www.googleapis.com/auth/compute",
                                "https://www.googleapis.com/auth/cloud-platform"
                            ],
                            "imageType": "COS",
                            "labels":{
                              "compute_type": "preemptible"
                            },
                            "preemptible": True,
                            "diskType": "pd-standard"
                        },
                        "initialNodeCount": 1,
                        "autoscaling": {
                            "enabled": True,
                            "minNodeCount": 0,
                            "maxNodeCount": 10
                        },
                        "management": {
                            "autoUpgrade": True,
                            "autoRepair": True
                        },
                        "version": properties["cluster_version"]
                    }]
                }
            }
        }]
    }
