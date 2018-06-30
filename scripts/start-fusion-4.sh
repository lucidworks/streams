#!/bin/bash

TYPE=n1-standard-4
ZONE=us-west1-c

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)

gcloud compute instances create fusion-server-4-$NEW_UUID \
--machine-type $TYPE \
--image "ubuntu-1604-xenial-v20180612" \
--image-project "ubuntu-os-cloud" \
--boot-disk-size "50" \
--boot-disk-type "pd-ssd" \
--boot-disk-device-name "$NEW_UUID" \
--zone $ZONE \
--labels type=fusion \
--tags lucid \
--preemptible \
--metadata startup-script='#! /bin/bash
sudo su -

apt-get update -y
sudo add-apt-repository ppa:webupd8team/java -y
echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
apt-get update -y

sudo apt-get install oracle-java8-installer -y
sudo apt install oracle-java8-set-default -y

apt-get install unzip -y
echo JAVA_HOME="/usr/lib/jvm/java-8-oracle" >> /etc/environment

# only download and untar if we do not have a /fusion directory
if [ ! -d "/fusion" ]; then
wget -nv https://storage.googleapis.com/streams-fusion/fusion-4.0.2.tar.gz
tar xvfz fusion-4.0.2.tar.gz
fi
# just start it up
/fusion/4.0.2/bin/fusion start
'

sleep 15
IP=$(gcloud compute instances describe fusion-sockitter-$NEW_UUID --zone $ZONE  | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')
gcloud compute firewall-rules create fusion --allow tcp:8764
gcloud compute firewall-rules create fusion --allow tcp:8763

echo "Fusion UI available in a few minutes at: http://$IP:8764"
