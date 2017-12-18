#!/bin/bash
if [ -n "$1" ]; then echo "found route named '$1'"; else echo "need to set route"; exit; fi

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)

gcloud compute instances create fusion-server-$NEW_UUID \
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
wget https://download.lucidworks.com/fusion-3.1.2/fusion-3.1.2.tar.gz
tar xvfz fusion*.tar.gz
/fusion/3.1.2/bin/fusion start
'

# gcloud compute instances attach-disk fusion-server-$NEW_UUID --disk=fusion-data --zone us-central1-a

IP=$(gcloud compute instances describe fusion-server-$NEW_UUID | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')

# set up a proxy via wisdom for the APIs
curl -X DELETE https://api.wisdom.sh/api/$1
curl -X POST \
  --url https://api.wisdom.sh/api/ \
  --data 'name='$1 \
  --data 'upstream_url=http://$IP:8764/' \
  --data 'uris=/'$1 \
  | python -m json.tool

echo "Fusion UI available in a few minutes at: http://$IP:8764"
echo;
echo "API access available in a few minutes at: https://api.wisdom.sh/$1/api/..."
