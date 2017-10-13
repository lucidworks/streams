#!/bin/bash
echo "requires gcloud!"

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
wget https://download.lucidworks.com/fusion-3.1.0/fusion-3.1.0.tar.gz
tar xvfz fusion*.tar.gz
/fusion/3.1.0/bin/fusion start
'
IP=$(gcloud compute instances describe fusion-server-$NEW_UUID | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$
//')
echo "Fusion UI will be available at http://$IP:8764 in a few minutes."