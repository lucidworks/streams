#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)

gcloud compute instances create tensorflow-server-$NEW_UUID \
--machine-type "n1-standard-4" \
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
sudo apt-get install python-pip -y
sudo apt-get install ipython -y
sudo apt-get install unzip -y
sudo pip install --upgrade pip
sudo pip install tensorflow
sudo pip install jupyter
sudo pip install Pillow
cd /
sudo git clone https://github.com/tensorflow/tensorflow
cd tensorflow/tensorflow/examples/tutorials/deepdream/
sudo jupyter notebook --allow-root --ip 0.0.0.0 --port 8888 &
'
IP=$(gcloud compute instances describe tensorflow-server-$NEW_UUID | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')

# set up proxy 
#curl -X DELETE \
#  --url http://api.wisdom.sh/api/lucidlabs

#curl -X POST \
#  --url https://api.wisdom.sh/api/ \
#  --data 'name=lucidlabs' \
#  --data 'upstream_url=http://$IP:8764/' \
#  --data 'uris=/lucidlabs' \
#  | python -m json.tool

echo "Tensorflow UI available in a few minutes at: http://$IP:8888"
echo; 
#echo "API access available in a few minutes at: https://api.wisdom.sh/lucidlabs/api/..." 
#echo;

gcloud -q compute --project=$DEVSHELL_PROJECT_ID firewall-rules create jupyter --direction=INGRESS --priority=1000 --network=default --action=ALLOW --rules=tcp:8888,udp:8888 --source-ranges=0.0.0.0/0
echo "Firewall rules updated for project. UDP/8888 and TCP/8888 now open."
