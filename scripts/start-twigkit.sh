#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)
SERVER_NAME=twigkit-dev-$NEW_UUID

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
apt-get install unzip
#
mv /bin/sh /bin/sh.bak
ln /bin/bash /bin/sh
#
wget https://bin.equinox.io/c/4VmDzA7iaHb/ngrok-stable-linux-amd64.zip
unzip ngrok*.zip
mv ngrok /usr/local/bin/
#
mkdir -p /usr/local/java
wget https://storage.googleapis.com/oracle-java/jdk-9.0.1_linux-x64_bin.tar.gz
mv jdk*.tar.gz /usr/local/java/
tar xvfz /usr/local/java/jdk*.tar.gz
sudo update-alternatives --install "/usr/bin/java" "java" "/usr/local/java/jdk-9.0.1/bin/java" 1
JAVA_HOME=/usr/local/java/jdk-9.0.1
JRE_HOME=$JAVA_HOME/jre
PATH=$PATH:$JAVA_HOME/bin:$JRE_HOME/bin
export JAVA_HOME
export JRE_HOME
export PATH
#
mkdir -p /root/twigkit
cd /root/twigkit/
git clone https://github.com/lucidworks/streams.git
cd streams/ui
./twigkit start &
#
ngrok http 8080 > /dev/null &
curl localhost:4040/api/tunnels | python -m json.tool

'
IP=$(gcloud compute instances describe $SERVER_NAME --zone us-west1-b | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')
echo "Server will be available at $IP in a few minutes."
