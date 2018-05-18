# Sockitter for Fusion
This application adds powerful semantic graph capabilities to Lucidwork's [Fusion 4.x](https://lucidworks.com/products/fusion-server/), allowing it to do real-time traversal and ranking of data relationships on Twitter. As Fusion monitors Twitter, tweets are analyzed for content similarities to other Twitter objects using the [Semantic Knowledge Graph](https://github.com/treygrainger/semantic-knowledge-graph) (SKG) plugin for Solr.

A white paper covering the technology behind SKG is located on [arXiv.org](https://arxiv.org/abs/1609.00464). Examples queries showing off SKG's capabilities are [shown below](https://github.com/lucidworks/streams/tree/master/projects/sockitter#searching-twitter-data).

The Sockitter application demos several Fusion features including:

- stream based connectors
- middleware implementation
- semantic knowledge graphs

## Video
This guide comes with a video covering the setup process and demo. It is suggested you watch the video first, then step through the guide below to install and configure the demo on your own Google Cloud account.

[![IMAGE ALT TEXT HERE](https://img.youtube.com/vi/Yl1w5iiBHqA/0.jpg)](https://www.youtube.com/watch?v=Yl1w5iiBHqA)

## Setup
The demo application may be started from the Google Cloud console with a single command. With a bit of work, it may be re-purposed to run locally or on AWS and other cloud providers.

### Google Cloud Setup
If you do not already have a Google Cloud account, head on over to [https://cloud.google.com/](https://cloud.google.com/) and click on the `TRY IT FREE` button to get a $300 credit with a new account. 

*NOTE: This demo will start a preemptible instance running Fusion 4.x, *which will live at most for 24 hours*. The run cost for this instance is about $1 per 24 hours, but your mileage may vary. Do keep in mind you may need to restart your instance from time to time.*

### Download and Start the Demo
The demo instance is started by running a script which is checked out from Github using the `git` command, which is run from the Google Cloud Shell. To start a new shell, navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/) and click on the `>_` button toward the top right of the screen.

![animation](https://github.com/lucidworks/streams/blob/master/assets/images/cloudshell.gif?raw=true)

Once you are in the Google Cloud Console, you can download the startup script from Github by entering the following:

**Commands:**
```
git clone https://github.com/lucidworks/streams
cd streams/projects/sockitter
```

**Sample Output:**
```
$ git clone https://github.com/lucidworks/streams
Cloning into 'streams'...
remote: Counting objects: 2420, done.
remote: Compressing objects: 100% (24/24), done.
remote: Total 2420 (delta 12), reused 21 (delta 8), pack-reused 2388
Receiving objects: 100% (2420/2420), 94.40 MiB | 47.15 MiB/s, done.
Resolving deltas: 100% (1247/1247), done.

$ cd streams
$ ls
episodes  images  projects  README.md  scripts
$ cd projects/
$ ls
samjna  sockitter  zendai
$ cd sockitter/
$ ls
dev  README.md  secrets-sample.sh server-sample.sh  start-sockitter.sh
$
```

#### Create and Edit the Secrets File
Before you can deploy the instance, you will need to create a file that contains your Twitter application credentials. If you haven't created a Twitter application and keys already, head on over to the [How to Create a Twitter Application](http://docs.inboundnow.com/guide/create-twitter-application/) guide to walk through the process.

Once you have your four tokens/keys/secrets ready, edit the 'secrets-sample.sh' file with your Twitter credentials from the *Google Cloud Shell*.

**Commands:**
```
$ pico secrets-sample.sh
```

Using the application values from Twitter and creating a password for Fusion, edit the secrets file to look something like this:

```
#!/bin/bash

# set these to your twitter credentials and rename this to secrets.sh before starting instance
CONSUMER_KEY=UyBLDq08scXYSaJa5eO1upkMs
CONSUMER_SECRET=T0npcUIGVvmQ3IOTQTeghFP4PDLQIJ0Uot0LZ9O4fjhqvyFbnL
ACCESS_TOKEN=362411863932719104-LXRvHlogQVSjtbU3GmX5ovUa8s30oqr
SECRET_TOKEN=1bRDU9BjuzWMad4qmw3hVjVHabod30dydy37GrQIC5F1VN
FUSION_PASSWORD=foobarb4z
```

*NOTE: The password you pick and place in this file will be used to create a username/password pair for Fusion. The username will be 'admin' and the password will be whatever you place in this file when you login.*

Next, copy the file to a new file called `secrets.sh`:

**Commands:**
```
cp secrets-sample.sh secrets.sh
```


#### Deploy the Instance

To start the demo instance, run the `start-sockitter.sh` script command:

**Command:**
```
./start-sockitter.sh
```

**Sample Output:**
```
$ ./start-sockitter.sh

Here's where I say, hold on a second while we fire things up.
Created [https://www.googleapis.com/compute/v1/projects/wisdom-172109/zones/us-west1-c/instances/fusion-sockitter-ee1d].
NAME                   ZONE        MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP    STATUS
fusion-sockitter-ee1d  us-west1-c  n1-standard-8  true         10.138.0.2   35.230.21.180  RUNNING
Creating firewalls...

Thank you for running me. Here's what I know:
Fusion UI available in a few minutes at: http://35.230.21.180:8764
Admin UI available in a few minutes at: http://35.230.21.180:8780/sockitter-editor
API access available in a few minutes at: https://35.230.21.180:8764/api/...
API Docs are here: https://doc.lucidworks.com/fusion-server/4.0/index.html
```

Starting the instance takes about 10 minutes. After that, you can click on the `Fusion UI` link and navigate to the Fusion login page.

#### Making the Instance non-Preemtible
To create an instance which is not preemtible, edit and remove [line 41](https://github.com/lucidworks/streams/blob/master/projects/sockitter/start-sockitter.sh#L41) from the `start-sockitter.sh` file. Keep in mind that the non-preemtible instance is **US$0.38/hour**, which works out to **US$9.12/day**! In comparison, the same preemtible instance is only **US$0.07/hour**.

```
...
gcloud compute instances create fusion-sockitter-$NEW_UUID \
--machine-type "n1-standard-8" \
--image "ubuntu-1604-xenial-v20180405" \
--image-project "ubuntu-os-cloud" \
--boot-disk-size "50" \
--boot-disk-type "pd-ssd" \
--boot-disk-device-name "$NEW_UUID" \
--zone $ZONE \
--labels ready=true \
--tags lucid \
--preemptible \ <--- REMOVE THIS LINE
--metadata-from-file startup-script=server.sh
...
```

### Following Accounts
By default, Sockitter will attempt to pull a full feed of Twitter data. It is *strongly* suggested you add a few accounts to monitor to the application before starting the connector.

To edit and/or start the Twitter connector, navigate to the *Admin UI* link ouput by the startup script. Here's an example:

```
Admin UI available in a few minutes at: http://35.230.21.180:8780/sockitter-editor
```

To follow a new account, type in the account's screen name in the field before the `Lookup ID` button and then click on the button to look up the account's numeric ID. Click on the `Add ID` button to add the account to the list of accounts to stream into Fusion.

[ANIMATED GIF]

Once you have added the account, it will appear in the *Following* list at the top. To stop indexing an account, click on the `x` next to the account's name.

*NOTE: "Following" an account from within the Sockitter admin page DOES NOT cause your account to follow the account in question on Twitter. Instead, it simply "watches" or "streams" that account's activity into Fusion, for searching later. Any historic Tweets made by the account, prior to being "followed" by Fusion, will not be included!*

## Searching Twitter Data
Once the connector has received and indexed a few tweets, an SKG based request can be made to query the normal and inverted indexes:

```
curl -X POST \
  'http://35.230.21.180:8983/solr/sockitter/skg?qf=tweet_t' \
  -H 'cache-control: no-cache' \
  -H 'content-type: application/json' \
  -d '{
    "queries" : ["tweet_t:\"toasters\""],
    "compare" : [ 
        {
            "type": "tweet_t",
            "limit":1,
            "sort":"relatedness",
            "values" : ["waffles"],
            "discover_values": true,
            "compare" : [
                {
                    "type": "tweet_t",
                    "limit": 5,
                    "sort": "relatedness"
                }
            ]
        }
    ]
}'
```

If you find this demo useful to you or your company's search processes, please star this repo and [contact Lucidworks directly](https://lucidworks.com/ppc/lucidworks-fusion-solr/?utm_source=streams) for more information. 

If you have any questions or comments for the Stream Team (or have found a bug) [please open an issue](https://github.com/lucidworks/streams/issues)!
