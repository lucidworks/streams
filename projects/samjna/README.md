# Samjna for Fusion
Saṃjñā (sam-ji-na) is the Sanskrit word for "perception" or "cognition". 

This application adds image-based perception capabilities to Lucidwork's [Fusion 4.x](https://lucidworks.com/products/fusion-server/) using a general AI network. As Fusion crawls, images are sent to the network which then extracts tags related to the images being processed. These tags are then inserted by Fusion into search index.

## Video
This guide comes with a full length video showing the setup process outlined below. It is suggested you watch the video first, then step through the guide below to install and configure the demo yourself on your own account.

[video]

## Setup
The demo application may be started from the Google Cloud console with only a few simple commands. With a bit of work, it may be repurposed to run locally or on AWS and other cloud providers.

This application demos several Fusion features including:

- Field and Entity Extraction
- Query RPC Stage w/Auth
- Insertion of New Document Fields
- Boosting Results Using Specific Fields

### Google Cloud Setup
If you do not already have a Google Cloud account, head on over to [https://cloud.google.com/](https://cloud.google.com/) and click on the "TRY IT FREE" button to get a $300 credit. The following video shows the required steps for getting your free trial going on Google Cloud.

[video]

This demo will start a preemptible instance running Fusion 4.x, which will live at most for 24 hours. The run cost for this instance is about $1 a day, but your mileage may vary.

### Download and Start the Demo
The demo instance is started by running a script which is checked out from Github using the `git` command from the Google Cloud Shell. To start a new shell, navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/) and click on the `>_` button toward the top right of the screen.

[Animated GIF]

Once you are in the Google Cloud Console, you can download the startup script from Github by entering the following commands:

Commands:
```
git clone https://github.com/lucidworks/streams
cd streams/projects/samjna
```

Sample Output:
```
$ git clone https://github.com/lucidworks/streams
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

Command:
```
./start-samjna.sh
```

Sample Output:
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

Here is a short video demo showing the above processes.

[video]

### Configuring Fusion
When you first connect to Fusion's UI, it will prompt you for a password and an agreement to Lucidwork's License Terms. Use something simple here, given the instance is temporary and won't be left running for more than a day.

[Animated GIF]

If you would like more information about Fusion sent to your mailbox, fill out the first, last and email address fields on the `Registration` page. Otherwise, click on `Skip` to be logged into the instance.

[Animated GIF]

The Quickstart guide will appear. Dismiss the guide by clicking on the `Exit the Quickstart` button at the lower left.

[Animated GIF]

#### Downloading the Application
Download the application to your computer before uploading it to the new Fusion instance. This can be done automatically in a production environment, but here we'll do it for practice.

Click the following link to download the application: [https://github.com/lucidworks/streams/raw/master/projects/samjna/dist/Samjna-0.0.2.zip](https://github.com/lucidworks/streams/raw/master/projects/samjna/dist/Samjna-0.0.2.zip)

Once the application has been downloaded, click on the `Import app` button in the welcome screen in Fusion:

[Animated GIF]

Click on `Choose File` under `Data File` and then pick the `Samjna-0.0.2.zip` file downloaded earlier. Click `Import` to start the application import. Review the information screen when it is shown and then click on `Close`.

#### Obtain a Clarifai Key
Click on the `Samjna` Application on the welcome screen. `Samjna_Collection` will appear at the top left.

#### Starting the Crawl
 Click on the second icon from the top on the left and select and click on `Datasources`. Click on the `Etsy` datasource in the list.

On the right side of the datasource view, scroll down and open and review the `Limit Documents` settings. For this example, we will be limiting the crawl of Etsy to 2,000 documents.




