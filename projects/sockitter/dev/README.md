Sockitter Editor
================

Follow and manager twitter handles, analyze tweets, hashtags, and connections.


Building
========
`ant` runs the "package-app" target by default

The artifact `build/sockitter.zip` is generated.  
 
Installation
============

    This application was built for Fusion 4.0.2

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
