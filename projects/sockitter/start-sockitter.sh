#!/bin/bash

if [ -f secrets.sh ]; then
   source secrets.sh # truly, a travesty
   echo "Here's where I say, hold on a second."

else
   echo "TODO List"
   echo "1. Edit 'secrets-sample.sh' with your Twitter credentials.";
   echo "2. Rename the file to 'secrets.sh'.";
   echo "3. Rerun this script.";
   exit;
fi

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)

gcloud compute instances create fusion-sockitter-$NEW_UUID \
--machine-type "n1-standard-8" \
--image "ubuntu-1604-xenial-v20180405" \
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
sudo add-apt-repository ppa:webupd8team/java -y
echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
apt-get update -y

sudo apt-get install oracle-java8-installer -y
sudo apt install oracle-java8-set-default -y

echo JAVA_HOME="/usr/lib/jvm/java-8-oracle" >> /etc/environment

apt-get install unzip -y
apt-get install ant -y

IP=$(wget -qO- http://ipecho.net/plain)

cd /; git clone https://github.com/lucidworks/streams

sed -i "
s,YOUR_TOKEN,$TOKEN,g;
s,YOUR_TOKEN_SECRET,$TOKEN_SECRET,g;
s,YOUR_CONSUMER_KEY,$CONSUMER_KEY,g;
s,YOUR_CONSUMER_SECRET,$CONSUMER_SECRET,g;
" /streams/projects/sockitter/dev/app.properties

sed -i "
s,YOUR_FUSION_PASSWORD,$FUSION_PASSWORD,g;
s,localhost,$IP,g;
" /streams/projects/sockitter/dev/fusion.properties

# only download and untar if we do not have a /fusion directory
if [ ! -d "/fusion" ]; then
wget https://storage.googleapis.com/streams-fusion/fusion-4.0.1.tar.gz
tar xvfz fusion-4.0.1.tar.gz
fi

cd /
/fusion/4.0.1/bin/fusion restart
'

sleep 15

IP=$(gcloud compute instances describe fusion-sockitter-$NEW_UUID --zone us-central1-a  | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')
gcloud compute firewall-rules create fusion --allow tcp:8763
gcloud compute firewall-rules create fusion-appkit --allow tcp:8080
gcloud compute firewall-rules create fusion-webapp --allow tcp:8780

echo "Thank you for running me. Here's what I know:"
echo "Fusion UI available in a few minutes at: http://$IP:8764"
echo "Admin UI available in a few minutes at: http://$IP:8780"
echo "API access available in a few minutes at: https://$IP:8764/api/..." 
echo "API Docs are here: https://doc.lucidworks.com/fusion-server/4.0/index.html"

