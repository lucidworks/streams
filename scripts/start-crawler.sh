#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)

gcloud compute instances create dev-crawler-$NEW_UUID \
--machine-type "n1-standard-1" \
--image "ubuntu-1604-xenial-v20180522" \
--image-project "ubuntu-os-cloud" \
--boot-disk-size "50" \
--boot-disk-type "pd-ssd" \
--boot-disk-device-name "$NEW_UUID" \
--zone us-central1-b \
--labels ready=true \
--tags lucid \
--metadata startup-script='#! /bin/bash
sudo su -
sudo mkdir /huge/
apt-get update -y
apt-get install unzip -y
apt-get install python-setuptools -y
easy_install pip
pip install tweepy
'

sleep 15
gcloud compute instances attach-disk dev-crawler-$NEW_UUID --disk crawler-data --zone us-central1-b

IP=$(gcloud compute instances describe dev-crawler-$NEW_UUID --zone us-central1-b  | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')

echo "Server started with $IP. Use the SSH button to login."
echo "Run 'sudo mount /dev/sdb1 /huge/' and then 'cd /huge/bots/' to get started..."
echo "API access available in a few minutes at: https://$IP:8764/lucidlabs/api/..." 
