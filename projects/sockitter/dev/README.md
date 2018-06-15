        handles for humans
    fusion webapp middleware
        twitter by I.D.

Sockitter Dev
=============

Building and packaging a (Fusion) webapp within a (Fusion) app.

Building
========
`ant` runs the `package-app` target by default

The artifact `build/sockitter.zip` is generated.  

Dev Cycle
=========

The usual developer workflow here is to tinker with the webapp/index.html or FusionGateway.java and quickly re-deploy to a dev instance of Fusion.   This is a handy command-line to quickly re-deploy a fresh build into a live Fusion instance:

```$ ant -Dfusion.password=password123 clean uninstall-webapp install-webapp```

The settings in `fusion.properties` are used, and can be overridden as in the `fusion.password` example here.

Installation
============

    This application was built for Fusion 4.0.2

*Prerequisites:* The twitter-stream connector must first be installed.

    ant install-connector
      -or-
    curl -u admin:password123 -X PUT -H 'Content-type: application/zip' --data-binary @conf/lucid.twitter-stream-4.0.2.zip "http://localhost:8764/api/blobs/twitter-stream-4.0.2.zip?resourceType=plugin:connector"

From the Fusion main page, within "Add new app", choose `Import App`.
For the Data file, select sockitter.zip
For the Variables file, select your variables file.

## Variables file

The variables file is a JSON file with the following structure:

```
{
  "secret.1.twitter_consumer_key" : "YOUR_CONSUMER_KEY",
  "secret.2.twitter_consumer_secret" : "YOUR_CONSUMER_SECRET",
  "secret.3.twitter_token" : "YOUR_ACCESS_TOKEN",
  "secret.4.twitter_token_secret" : "YOUR_SECRET_TOKEN",
  "secret.5.google_vision_key" : "YOUR_GOOGLE_VISION_KEY"
}

```

Copy the above to a new file and fill in YOUR_* settings.
