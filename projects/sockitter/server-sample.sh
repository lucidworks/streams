#!/bin/bash
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
s,YOUR_ACCESS_TOKEN,%ACCESS_TOKEN%,g;
s,YOUR_SECRET_TOKEN,%SECRET_TOKEN%,g;
s,YOUR_CONSUMER_KEY,%CONSUMER_KEY%,g;
s,YOUR_CONSUMER_SECRET,%CONSUMER_SECRET%,g;
" /streams/projects/sockitter/dev/app.properties

sed -i "
s,YOUR_FUSION_PASSWORD,%FUSION_PASSWORD%,g;
s,localhost,$IP,g;
" /streams/projects/sockitter/dev/fusion.properties

# only download and untar if we do not have a /fusion directory
if [ ! -d "/fusion" ]; then
wget https://storage.googleapis.com/streams-fusion/fusion-4.0.1.tar.gz
tar xvfz fusion-4.0.1.tar.gz
fi

cd /
/fusion/4.0.1/bin/fusion restart
