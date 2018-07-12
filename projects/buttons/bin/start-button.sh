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

# only download and untar if we do not have a /fusion directory
if [ ! -d "/fusion" ]; then
#############################
# if fusion not installed
#############################
wget -nv https://storage.googleapis.com/streams-fusion/fusion-4.0.2.tar.gz
tar xvfz fusion-4.0.2.tar.gz

# link up fusion
ln -s /fusion/ /root/fusion

# replace line in /fusion/conf/fusion.properties
sed -i "
s,solr.jvmOptions = -Xmx2g -Xss256k,solr.jvmOptions = -Xmx2g -Xss256k -Denable.runtime.lib=true,g;
" /fusion/conf/fusion.properties

# restart
/fusion/4.0.2/bin/fusion restart

# set the password
curl -X POST -H 'Content-type: application/json' -d '{"password":"%FUSION_PASSWORD%"}' http://localhost:8764/api

# install the twitter app
#cd /streams/projects/sockitter/dev;
#ant install-connector
#ant package-app

# call fusion to install
#curl -u admin:%FUSION_PASSWORD% -H "Content-Type:multipart/form-data" -X POST -F 'importData=@/streams/projects/sockitter/dev/build/sockitter.zip' -F 'variableValues=@/streams/projects/sockitter/dev/app/passwords.json' http://localhost:8764/api/objects/import?importPolicy=overwrite

# build SKG FTW
#mkdir /skg; cd /skg
#git clone https://github.com/treygrainger/semantic-knowledge-graph.git
#cd semantic-knowledge-graph
#git checkout solr_7.2.1
#cd knowledge-graph
#mvn package

# restart
#/fusion/4.0.2/bin/fusion restart

# curling to solr to install and configure skg
#cd /skg/semantic-knowledge-graph/knowledge-graph/target;
#curl -X POST -H 'Content-Type: application/octet-stream' --data-binary @semantic-knowledge-graph-1.0-SNAPSHOT.jar http://localhost:8983/solr/.system/blob/skg.jar
#curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-runtimelib": { "name":"skg.jar", "version":1 } }'
#curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-queryresponsewriter": { "name": "skg",    "runtimeLib": true,    "class": "com.careerbuilder.search.relevancy.responsewriter.KnowledgeGraphResponseWriter"} }'
#curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-requesthandler" : {  "name": "/skg",    "class":"com.careerbuilder.search.relevancy.KnowledgeGraphHandler",    "defaults":{ "defType":"edismax", "wt":"json"},    "invariants":{"wt":"skg"},    "runtimeLib": true  } }'


#############################
# end if fusion not installed
#############################
else
/fusion/bin/fusion restart
fi

echo "Button FOO started!!!"
