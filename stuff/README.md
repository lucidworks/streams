Prerequisites
=============

* Ant 1.9.x+ required
* Install Fusion's twitter-stream connector

Installation
============

1. Customize app.properties
2. Custom fusion.properties

`ant install`

TODO
====
* link webapp to app
curl -u admin:Lucidworks1 -X PUT -H 'Content-type: application/json' -d  '{"subject" : "collection:Wines","object" : "app:General","linkType" : "inContextOf"}'  http://localhost:8764/api/links

{
  "subject" : "blob:webapps/sockitter-editor.war",
  "object" : "app:sockitter",
  "linkType" : "inContextOf"
}
