set -x

curl -u $FUSION_API_CREDENTIALS -H "Content-Type:multipart/form-data" -X POST -F 'importData=@Semantic_Knowledge_Graph.zip' $FUSION_API_BASE/objects/import?importPolicy=overwrite

# replace line in /fusion/conf/fusion.properties
sed -i "
s,solr.jvmOptions = -Xmx2g -Xss256k,solr.jvmOptions = -Xmx2g -Xss256k -Denable.runtime.lib=true,g;
" /fusion/conf/fusion.properties

# build SKG FTW
mkdir /skg; cd /skg
git clone https://github.com/treygrainger/semantic-knowledge-graph.git
cd semantic-knowledge-graph
git checkout solr_7.2.1
cd knowledge-graph
mvn package

# restart
/fusion/4.0.2/bin/fusion restart

# curling to solr to install and configure skg
cd /skg/semantic-knowledge-graph/knowledge-graph/target;
curl -X POST -H 'Content-Type: application/octet-stream' --data-binary @semantic-knowledge-graph-1.0-SNAPSHOT.jar http://localhost:8983/solr/.system/blob/skg.jar
curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-runtimelib": { "name":"skg.jar", "version":1 } }'
curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-queryresponsewriter": { "name": "skg",    "runtimeLib": true,    "class": "com.careerbuilder.search.relevancy.responsewriter.KnowledgeGraphResponseWriter"} }'
curl http://localhost:8983/solr/sockitter/config -H 'Content-type:application/json' -d '{  "add-requesthandler" : {  "name": "/skg",    "class":"com.careerbuilder.search.relevancy.KnowledgeGraphHandler",    "defaults":{ "defType":"edismax", "wt":"json"},    "invariants":{"wt":"skg"},    "runtimeLib": true  } }'

