set -x

# eventually add an app into fusion for PART 2 DEMO - data will need to be off by itself (Connor will provide details)
#curl -u $FUSION_API_CREDENTIALS -H "Content-Type:multipart/form-data" -X POST -F 'importData=@Fusion_Superset.zip' $FUSION_API_BASE/objects/import?importPolicy=overwrite



# Steps:
#   Download and install Apache Superset on docker
#     - TODO: need to included Superset distro here


#install core utilities
apt-get install -y build-essential libssl-dev libffi-dev python-dev python-pip libsasl2-dev libldap2-dev
#
# Docker section start ############

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add
add-apt-repository -y "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
apt-get update
apt-cache policy docker-ce
apt-get install -y docker-ce
curl -L https://github.com/docker/compose/releases/download/1.24.0-rc1/docker-

docker run -d --name superset -p 8088:8088 tylerfowler/superset



# End Docker ##############

# To start a development web server on port 8088, use -p to bind to another port


#   Download and install Lucidworks Fusion
#     - done (Fusion already assumed running at this point in the script)
# replace line in /fusion/conf/fusion.properties

sed -i "
s/group.default = zookeeper, solr, api, connectors-classic, connectors-rpc, proxy, webapps, admin-ui, sql, log-shipper/group.default = zookeeper, solr, api, connectors-classic, connectors-rpc, proxy, webapps, admin-ui, sql, log-shipper, spark-master, spark-worker/g;
" /fusion/conf/fusion.properties

#   Configure Lucidworks Fusion to work in `binary` mode.
mkdir /patch_lab
mv /fusion/conf/hive-site.xml /patch_lab
pwd
cp /superset/fusion_conf/conf/hive-site_2.xml /patch_lab
cd /patch_lab
diff -u hive-site.xml hive-site_2.xml > hive-site.patch

patch < hive-site.patch

mv hive-site.xml /fusion/conf/

sleep 3

/fusion/4.*/bin/fusion restart
#   Create an app in Lucidworks Fusion and index data so that you have at least one collection.
#     - TODO: include app here, that has a blob datasource
#     - TODO: start the datasource here?


#   Create Your First Chart
#     - TODO: can we bake this in?

# Diagnostics
python --version

diff -r fusion_conf/conf /fusion/conf
