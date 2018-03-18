#!/bin/bash

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)

gcloud compute instances create fusion-samjna-$NEW_UUID \
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
sudo add-apt-repository ppa:webupd8team/java -y
echo debconf shared/accepted-oracle-license-v1-1 select true | sudo debconf-set-selections
echo debconf shared/accepted-oracle-license-v1-1 seen true | sudo debconf-set-selections
apt-get update -y
sudo apt-get install oracle-java8-installer -y
apt-get install unzip -y
echo JAVA_HOME="/usr/lib/jvm/java-8-oracle" >> /etc/environment

mkdir /samjna; cd /samjna
curl http://supergsego.com/apache/tomcat/tomcat-8/v8.5.29/bin/apache-tomcat-8.5.29.zip > tomcat.zip
unzip tomcat.zip
git clone https://github.com/lucidworks/streams.git
rm -rf /samjna/apache-tomcat-8.5.29/webapp/ROOT
cp /samjna/streams/projects/samjna/dist/ROOT.war /samjna/apache-tomcat-8.5.29/webapp/

cd /
# only download and untar if we do not have a /fusion directory
if [ ! -d "/fusion" ]; then
wget https://download.lucidworks.com/fusion-4.0.1/fusion-4.0.1.tar.gz
tar xvfz fusion-4.0.1.tar.gz
fi

cd /
# you are now AWARE of the bit where opening a ticket requires more work than non-action.
cp /samjna/streams/projects/samjna/dist/ROOT.zip ./
unzip -P aware ROOT.zip 
mv twigkit.lic /root/ # howdy

cd /
/fusion/4.0.1/bin/fusion restart
chmod 755 /samjna/apache-tomcat-8.5.29/bin/catalina.sh
/samjna/apache-tomcat-8.5.29/bin/catalina.sh start
'

sleep 15

IP=$(gcloud compute instances describe fusion-samjna-$NEW_UUID --zone us-central1-a  | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')

echo "Thank you for running me. Here's what I know:"
echo "Fusion UI available in a few minutes at: http://$IP:8764"
echo "Samjna demo available in a few minutes at: http://$IP:8764"
echo "API access available in a few minutes at: https://$IP:8764/lucidlabs/api/..." 
echo "API Docs are here: https://doc.lucidworks.com/fusion-server/4.0/index.html"
