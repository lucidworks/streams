```
      tweeting up a storm
    puppets gumming up the works
        let's sock it to them
```

# Sockitter for Fusion

Using the [Semantic Knowledge Graph](https://github.com/treygrainger/semantic-knowledge-graph) (SKG) plugin for Solr, this application adds semantic graph capabilities and image indexing to Lucidwork's [Fusion 4.x](https://lucidworks.com/products/fusion-server/), allowing it to do real-time traversal and ranking of data relationships on Twitter through user accounts, tags, text and image content.

As Fusion monitors Twitter, searches may be conducted for content similarities between disparate types of Twitter conversations. A white paper covering the technology behind SKG is located on [arXiv.org](https://arxiv.org/abs/1609.00464). Examples queries showing off SKG's capabilities are [shown below](https://github.com/lucidworks/streams/tree/master/projects/sockitter#searching-twitter-data).

The Sockitter application demos several Fusion features including:

- stream based connectors
- middleware implementation
- semantic knowledge graphs
- indexing image meta data

## Video
This guide comes with a video covering the setup process and demo. It is suggested you watch the video first, then step through the guide below to install and configure the demo on your own Google Cloud account.

[![VIDEO](https://img.youtube.com/vi/WOG4E3-PuCk/0.jpg)](https://www.youtube.com/watch?v=WOG4E3-PuCk)

## Setup
The demo application may be started from the Google Cloud console with a single command. With a bit of work, it may be re-purposed to run locally or on AWS and other cloud providers.

### Google Cloud Setup
If you do not already have a Google Cloud account, head on over to [https://cloud.google.com/](https://cloud.google.com/) and click on the `TRY IT FREE` button to get a $300 credit with a new account.

### Download and Start the Demo
The demo instance is started by running a script which is checked out from Github using the `git` command, which is run from the Google Cloud Shell. To start a new shell, navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/) and click on the `>_` button toward the top right of the screen.

![animation](https://raw.githubusercontent.com/lucidworks/streams/master/assets/images/cloudshell-small.gif)

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
dev  README.md  samples secrets-sample.sh server-sample.sh  start-sockitter.sh
$
```

#### Create and Edit the Secrets File
Before you can deploy the instance, you will need to create a file that contains your Twitter and Google Vision credentials, along with a password for Fusion.

These links may be handy for setting up your various tokens:

- *[How to Create a Twitter Application](http://docs.inboundnow.com/guide/create-twitter-application/)*
- *[Google Cloud API Credential Manager](https://console.cloud.google.com/apis/credentials)*

When you are ready, edit the `secrets-sample.sh` in the `sockitter` directory. Again, this will be done from the *Google Cloud Shell*:

**Commands:**
```
$ vi secrets-sample.sh
```

**Example:**
```
#!/bin/bash

# twitter credentials
CONSUMER_KEY=UyBLDq08scXYSaJa5eO1upkMs
CONSUMER_SECRET=T0npcUIGVvmQ3IOTQTeghFP4PDLQIJ0Uot0LZ9O4fjhqvyFbnL
ACCESS_TOKEN=362411863932719104-LXRvHlogQVSjtbU3GmX5ovUa8s30oqr
SECRET_TOKEN=1bRDU9BjuzWMad4qmw3hVjVHabod30dydy37GrQIC5F1VN

# fusion credentials
FUSION_PASSWORD=abcd1234

# google credentials
GOOGLE_API_KEY=AIzaSyCrZqLuY4IoOpQwbDPYeiWQwpOvdqMRAlw
```

*NOTE: The password you pick and place in this file will be used to create a username/password pair for Fusion. The username will be 'admin' and the password will be whatever you place in this file when you login. Also, none of the keys above are valid, so be sure you use your own!*

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
Admin UI available in a few minutes at: http://35.230.21.180:8780/sockitter-editor/
API Docs are here: https://doc.lucidworks.com/fusion-server/4.0/index.html
```

Starting the instance takes about 10 minutes. After that, you can click on the `Fusion UI` link and navigate to the Fusion login page.

#### Making the Instance non-Preemtible
This demo will start a preemptible instance running Fusion 4.x, *which will live at most for 24 hours*. The run cost for this instance is less than $1 per 24 hours, but your mileage may vary. Do keep in mind you may need to restart your instance from time to time.

To start an instance which is not preemtible, use the `-p` flag:

```
./start-sockitter.sh -p
```

### Indexing Accounts
By default, Sockitter will attempt to pull a full feed of Twitter data. It is *strongly* suggested you add a few accounts to monitor to the application before starting the connector.

To edit and/or start the Twitter connector, navigate to the *Admin UI* link ouput by the startup script. Here's an example:

```
Admin UI available in a few minutes at: http://35.230.21.180:8780/sockitter-editor/
```

To follow a new account, type in the account's screen name in the field before the `Lookup ID` button and then click on the button to look up the account's numeric ID. Click on the `Add ID` button to add the account to the list of accounts to stream into Fusion.

![animation](https://github.com/lucidworks/streams/blob/master/assets/images/follow.gif)

**NOTE**: "Following" an account from within the Sockitter admin page DOES NOT cause your account to follow the account in question on Twitter. Instead, it simply "watches" or "streams" that account's activity into Fusion, for searching later. Any historic Tweets made by the account, prior to being "followed" by Fusion, will not be included!

### Adding Accounts Programmatically
To follow accounts programatically, refer to the `samples` directory in the `sockitter` directory. The `add.sh` script shows how to call an endpoint with a Twitter screen name to add it to the list of accounts to index:

```
#!/bin/bash
if [ -z "$1" ]; then
    echo "Please indicate an IP address to use to add screen names!";
    echo "Example: ./add.sh 104.199.112.115 senate.csv";
    exit;
fi
if [ -z "$2" ]; then
    echo "Please indicate a CSV file to use to add screen names!";
    echo "Example: ./add.sh 104.199.112.115 senate.csv";
    exit;
fi
while IFS=, read -r col1 col2
do
    curl -X POST "http://$1:8780/sockitter-editor/api/add?ds_name=tweets&screen_name=$col1";
    sleep 1;
done < $2
```

The sample data provide includes a fairly recent list of US senators and representatives. You can add either by calling the script with the IP of the server you started, plus the file containing the screen names you'd like to follow:

```
./add.sh 104.199.112.115 senate.csv
```

### Starting/Restarting the Twitter Stream Connector
Once you've added the screen names to the system, you will need to start/restart the Twitter stream connector. Start by navigating to the link the start script gave you, login, and then click on the `Sockitter` app card.

Click on `indexing...datasources` in the menus to the left. Click on the `tweets` datasource and then click on `run` and the `start` button. If the connector is already running, click on the `stop` button, wait, and then click on the `start` button when it reappears.

![connector](https://raw.githubusercontent.com/lucidworks/streams/master/assets/images/connector.png)


## Searching Data
Once the connector has receieved and indexed a few tweets, you can search the data being indexed by navigating to the Fusion UI URL, logging in, and then navigating to the `Query Workbench` view. We've included a few interesting facets for your searches, as well as boosting for newer documents.

![searching](https://raw.githubusercontent.com/lucidworks/streams/master/assets/images/search.png)

### Search with the SKG API
The SKG (semantic knowledge graph) plugin can be searched using the `curl` command or by using the `skg-query.py` example in the `samples` directory.

The program is called with the server's `IP` and a `search term`. Here, we are searching US congressional accounts for the term `wednesday` to get a list of accounts and related hashtags:

**Command:**
```
$ python skg-query.py 35.233.205.143 netneutrality

netneutrality topics
---------------------------------------
overrule 0.97218
cra 0.9711
haven't 0.96842
promised 0.96526
rules 0.96522
save 0.96367
fcc 0.96335
vote 0.95216
netneutrality 0.9348
why 0.9285
for 0.8339
you 0.82472
didn’t 0.82378
our 0.82102
t.co 0.81233
https 0.80748
thi 0.78815
issue 0.78137
and 0.76862
matte 0.76826
rule 0.76397
repbrady 0.75416
repjimcosta 0.73696
mat 0.72273
repcartwright 0.71408
th 0.70024
to 0.65614
repgonzalez 0.65139
the 0.62401
t 0.61986
repdavidscott 0.60377
repmarciafudge 0.58652
repdwightevans 0.56372
clyburn 0.54643
repbeatty 0.54013
repgenegreen 0.5339
gnbppnkrnu 0.52719
repstephmurphy 0.52399
repschneider 0.52079
reppaulcook 0.52023
congressmanruiz 0.51808
repamata 0.50493
repjoshg 0.50144
```

If you find this demo useful to you or your company's search processes, please star this repo and [contact Lucidworks directly](https://lucidworks.com/ppc/lucidworks-fusion-solr/?utm_source=streams) for more information.

If you have any questions or comments for the Stream Team (or have found a bug) [please open an issue](https://github.com/lucidworks/streams/issues)!
