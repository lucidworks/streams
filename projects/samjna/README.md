# Samjna for Fusion
Saṃjñā (we say sam-ji-na) is the Sanskrit word for "perception" or "cognition". 

This application adds image-based perception capabilities to Lucidwork's [Fusion 4.x](https://lucidworks.com/products/fusion-server/) using a general AI network. As Fusion crawls, document images are sent to the neural network which extracts tags from the images being processed. These generalized tags are inserted by Fusion into the search index.

## Video
This guide comes with a full length video showing the setup process outlined below. It is suggested you watch the video first, then step through the guide below to install and configure the demo yourself on your own Google Cloud account.

This application demos several Fusion features including:

- Field and Entity Extraction
- Query RPC Stage to Clarifai API w/Auth
- Insertion of New Document Fields
- Boosting Results Using Specific Fields

[video]

## Setup
The demo application may be started from the Google Cloud console with only a few simple commands. With a bit of work, it may be repurposed to run locally or on AWS and other cloud providers.

### Google Cloud Setup
If you do not already have a Google Cloud account, head on over to [https://cloud.google.com/](https://cloud.google.com/) and click on the `TRY IT FREE` button to get a $300 credit with a new account. 

This demo will start a preemptible instance running Fusion 4.x, *which will live at most for 24 hours*. The run cost for this instance is about $1 per 24 hours, but your mileage may vary. Do keep in mind you may need to restart your instance from time to time.

### Download and Start the Demo
The demo instance is started by running a script which is checked out from Github using the `git` command from the Google Cloud Shell. To start a new shell, navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/) and click on the `>_` button toward the top right of the screen.

![animation](https://github.com/lucidworks/streams/blob/master/assets/images/cloudshell.gif?raw=true)

Once you are in the Google Cloud Console, you can download the startup script from Github by entering the following commands:

**Commands:**
```
git clone https://github.com/lucidworks/streams
cd streams/projects/samjna
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
$ cd samjna/
$ ls
dist  README.md  start-samjna.sh
$
```

To start the Fusion demo instance, simply run the `start-samjna.sh` script command:

**Command:**
```
./start-samjna.sh
```

**Sample Output:**
```
$ ./start-samjna.sh
Created [https://www.googleapis.com/compute/v1/projects/wisdom-172109/zones/us-central1-a/instances/fusion-samjna-orur].
NAME                ZONE           MACHINE_TYPE   PREEMPTIBLE  INTERNAL_IP  EXTERNAL_IP     STATUS
fusion-samjna-orur  us-central1-a  n1-standard-8  true         10.128.0.5   104.197.75.229  RUNNING
Thank you for running me. Here's what I know:
Fusion UI available in a few minutes at: http://104.197.75.229:8764
Samjna demo available in a few minutes at: http://104.197.75.229:8764
API access available in a few minutes at: https://104.197.75.229:8764/api/...
API Docs are here: https://doc.lucidworks.com/fusion-server/4.0/index.html
```

The startup process takes about 10 minutes to complete. After that, you can click on the `Fusion UI URL` and navigate to the Fusion UI.

### Configuring Fusion
When you first connect to Fusion's UI, it will prompt you for a password and an agreement to Lucidwork's License Terms. Use something simple here, given the instance is temporary and won't be left running for more than a day.

![animation](https://github.com/lucidworks/streams/blob/master/assets/images/passwordfusion.gif?raw=true)

If you would like more information about Fusion sent to your mailbox, fill out the first, last and email address fields on the `Registration` page. Otherwise, click on `Skip` to be logged into the instance.

The Quickstart guide will appear. Dismiss the guide by clicking on the `Exit the Quickstart` button at the lower left.

#### Downloading the Application
Download the application to your computer before uploading it to the new Fusion instance. This can be done automatically in a production environment, but here we'll do it for practice.

Click the following link to download the application: [https://github.com/lucidworks/streams/raw/master/projects/samjna/dist/Samjna-0.0.2.zip](https://github.com/lucidworks/streams/raw/master/projects/samjna/dist/Samjna-0.0.2.zip)

Once the application has been downloaded, click on the `Import app` button in the welcome screen in Fusion:

[Animated GIF]

Click on `Choose File` under `Data File` and then pick the `Samjna-0.0.2.zip` file downloaded earlier. Click `Import` to start the application import. Review the information screen when it is shown and then click on `Close`.

#### Obtain a Clarifai Key
You may need obtain a [Clarifai developer key](https://www.clarifai.com/developer/account/signup) for this portion of the configuration. The following video guides you through obtaining a developer token from Clarifai:

![animation](https://github.com/lucidworks/streams/blob/master/assets/images/clarifai.gif?raw=true)

Once you have your token copied into the paste buffer, click on the `Samjna` Application from the welcome/launcher screen back in your Fusion instance. `Samjna_Collection` will appear at the top toward the left and a series of icons will appear to the left.

Click on the `Samjna_Collection` pipeline and then the `Clarifai General Network Query` stage to the right. Under `Clarifai General Network Query`, scroll down and change the `Authorization` property value to something like this:

```
Key c6de746c05d2417589ea19e458154f22
```

Be sure to substitute your own key in the field, leaving the `Key ` portion of the field value intact!

#### Starting the Crawl
In the Fusion UI, click on the second icon from the top on the left and then click on `Datasources`. Click on the `Etsy` datasource in the list.

On the right side of the datasource view, scroll down and open and review the `Limit Documents` settings. For this example, we will be limiting the crawl of Etsy to 2,000 documents.

At the top, click on `Run` to open the crawl scheduler. Click on the `Start` button to start the crawl of Etsy. Please do keep in mind that this crawl uses Etsy resources!

## Using the Application
Once the crawl has a few documents indexed, you will be able to start searching the Etsy index. Navigate to the link provided in the Google Cloud Shell. The search demo runs on `port 8080`, so you can also just note the IP of the instance and put `:8080` after it in the location bar of your browser.

**Sample Output:**
```
Thank you for running me. Here's what I know:
Fusion UI available in a few minutes at: http://104.197.75.229:8764
Samjna demo available in a few minutes at: http://104.197.75.229:8080
```

The application will ask you to login. Use `admin` for the username and the same password you picked earlier when setting up Fusion. Once you login, you will be presented with some default searches from Etsy. You may enter a search term at the top or combine search terms with image tags, which are presented as facets to the left.

[Animated GIF]

If you find this demo useful to you or your company's search processes, please star this repo and [contact Lucidworks directly](https://lucidworks.com/ppc/lucidworks-fusion-solr/?utm_source=streams) for more information. 

If you have any questions or comments for the #stream team (or have found a bug) [please open an issue](https://github.com/lucidworks/streams/issues)!
