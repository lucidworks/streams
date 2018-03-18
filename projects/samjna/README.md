# Samjna for Fusion
Saṃjñā (sam-ji-na) is the Sanskrit word for "perception" or "cognition". 

This application adds image-based perception capabilities to Lucidwork's [Fusion 4.x](https://lucidworks.com/products/fusion-server/) using a general AI network. As Fusion crawls, images are sent to the network which then extracts tags related to the image. These tags are then inserted by Fusion into the Solr-based search index.

## Setup
The application demo may be started from the Google Cloud console with only a few simple commands. With a bit of work, it may be repurposed to run locally or on AWS and other cloud providers.

This application demos several Fusion features including:

- Query RPC Stage with Authentication
- Field Extractions 
- Insertion of External Document Meta Data
- Boosting Results on Fields

### Google Cloud Setup
If you do not already have a Google Cloud account, head on over to [https://cloud.google.com/](https://cloud.google.com/) and click on the "TRY IT FREE" button to get a $300 credit. The following video shows the required steps for getting your free trial going on Google Cloud.

[video]

This demo will start a preemptible instance running Fusion 4.x, which will live at most for 24 hours. The run cost for this instance is about $1 a day, but your mileage may vary.

### Download and Start the Demo
The demo instance is started by running a script which is checked out from Github using the `git` command from the Google Cloud Shell. To start a new shell, navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/) and click on the `>_` button toward the top right of the screen.

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

```
