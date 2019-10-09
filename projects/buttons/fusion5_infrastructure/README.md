# Fusion 5 infrastructure

This folder contains the infrastructure to setup streams to install fusion5 in a shared
GKE cluster.

To install, first run the deployment manager script to setup the GKE cluster and VPC,
then install helm and install the `streams-infratructure` chart.

# deployment-manager

In the `deployment-manager` directory run:

`gcloud --project <project_name> deployment-manager deployments create lucidworks-streams-fusion5 --template streams-infra.jinja`

This will setup a VPC and GKE cluster. When deployment-manager has finished you can connect to the cluster with

`gcloud beta container clusters get-credentials lucidworks-streams-fusion5-cluster --region us-central1 --project <project_name>`


# Helm

## Initial Setup

To setup tiller with the permissions that we need run:
```
kubectl create serviceaccount --namespace kube-system tiller
kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
helm init --service-account tiller --wait
```

## Shared infrastructure helm chart

To install the streams-infrastructure chart run, `cd` to the `helm/streams-infrastructure` directory and run :

```
helm dep up
helm upgrade  --install --namespace infrastructure  infrastructure .
```
