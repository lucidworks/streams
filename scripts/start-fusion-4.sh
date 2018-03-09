#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)

gcloud compute instances create fusion-server-4-$NEW_UUID \
--machine-type "n1-standard-8" \
--image "ubuntu-1604-xenial-v20170811" \
--image-project "ubuntu-os-cloud" \
--boot-disk-size "50" \
--boot-disk-type "pd-ssd" \
--boot-disk-device-name "$NEW_UUID" \
--zone us-central1-a \
--labels ready=true \
--tags lucid \
--preemptible \
--metadata startup-script='#! /bin/bash
sudo su -
apt-get update -y
apt-get install default-jre -y
apt-get install unzip -y
# only download and unzip if we do not have a /fusion directory
if [ ! -d "/fusion" ]; then
wget https://s3.amazonaws.com/lucidworks-apollo-beta/fusion-4.0.0-RC2/fusion-4.0.0-RC2.zip
unzip fusion*.zip
fi
#
/fusion/4.0.0-RC2/bin/fusion start
'

# gcloud compute instances attach-disk fusion-server-$NEW_UUID --disk=fusion-data --zone us-central1-a
sleep 5

IP=$(gcloud compute instances describe fusion-server-$NEW_UUID | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')

# set up proxy 
curl -X DELETE \
  --url http://api.wisdom.sh/api/lucidlabs

curl -X POST \
  --url https://api.wisdom.sh/api/ \
  --data 'name=lucidlabs' \
  --data 'upstream_url=http://$IP:8764/' \
  --data 'uris=/lucidlabs' \
  | python -m json.tool

echo "Fusion UI available in a few minutes at: http://$IP:8764"
echo; 
echo "API access available in a few minutes at: https://api.wisdom.sh/lucidlabs/api/..." 
