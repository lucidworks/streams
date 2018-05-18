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
apt-get install maven -y
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
s,YOUR_ACCESS_TOKEN,%ACCESS_TOKEN%,g;
s,YOUR_SECRET_TOKEN,%SECRET_TOKEN%,g;
s,YOUR_CONSUMER_KEY,%CONSUMER_KEY%,g;
s,YOUR_CONSUMER_SECRET,%CONSUMER_SECRET%,g;
" /streams/projects/sockitter/dev/src/com/lucidworks/streams/sockitter/TwitterGateway.java

sed -i "
s,YOUR_FUSION_PASSWORD,%FUSION_PASSWORD%,g;
s,localhost,$IP,g;
" /streams/projects/sockitter/dev/fusion.properties

# only download and untar if we do not have a /fusion directory
if [ ! -d "/fusion" ]; then
wget https://storage.googleapis.com/streams-fusion/fusion-4.0.1.tar.gz
tar xvfz fusion-4.0.1.tar.gz
fi

# link up fusion
ln -s /fusion/ /root/fusion

# replace line in /fusion/conf/fusion.properties
sed -i "
s,-Dhttp.maxConnections=1000,-Dhttp.maxConnections=100 -Denable.runtime.lib=true,g 
" /fusion/conf/fusion.properties

# set the password
curl -X POST -H 'Content-type: application/json' -d '{"password":"YOUR_FUSION_PASSWORD"}' http://localhost:8764/api

# install the twitter app
cd /streams/projects/sockitter/dev;
ant install-connector
ant install

# build SKG FTW
mkdir /skg; cd /skg
git clone https://github.com/treygrainger/semantic-knowledge-graph.git
cd semantic-knowledge-graph
git checkout solr_7.2.1
cd knowledge-graph
mvn package

# restart
/fusion/4.0.1/bin/fusion restart

# curling to solr to install and configure skg
cd /skg/semantic-knowledge-graph/knowledge-graph/target;
curl -X POST -H 'Content-Type: application/octet-stream' --data-binary @semantic-knowledge-graph-1.0-SNAPSHOT.jar http://localhost:8983/solr/.system/blob/skg.jar
curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-runtimelib": { "name":"skg.jar", "version":1 } }'
curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-queryresponsewriter": { "name": "skg",    "runtimeLib": true,    "class": "com.careerbuilder.search.relevancy.responsewriter.KnowledgeGraphResponseWriter"} }'
curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-requesthandler" : {  "name": "/skg",    "class":"com.careerbuilder.search.relevancy.KnowledgeGraphHandler",    "defaults":{ "defType":"edismax", "wt":"json"},    "invariants":{"wt":"skg"},    "runtimeLib": true  } }'
