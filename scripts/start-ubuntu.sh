#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)
SERVER_NAME=wisdom-dev-$NEW_UUID

gcloud compute instances create $SERVER_NAME \
--machine-type "n1-standard-1" \
--image "ubuntu-1604-xenial-v20170811" \
--image-project "ubuntu-os-cloud" \
--boot-disk-size "20" \
--boot-disk-type "pd-ssd" \
--boot-disk-device-name "$NEW_UUID" \
--zone us-west1-b \
--labels ready=true \
--preemptible \
--metadata startup-script='#! /bin/bash
sudo su -
apt-get update -y
apt-get install default-jre -y
'
IP=$(gcloud compute instances describe $SERVER_NAME --zone us-west1-b | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')
echo "Server will be available at $IP in a few minutes."
