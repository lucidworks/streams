# Samjna for Fusion
This application adds document image perception capabilities to Lucidwork's Fusion 4.x. As Fusion crawls, images are sent to a general network AI which extracts tags related to the image and inserts them into the search index.

Saṃjñā (sam-ji-na) is the Sanskrit word for "perception" or "cognition".

## Setup
The application demo may be started from the Google Cloud console with only a few simple commands. With a bit of work, it may be repurposed to run locally or on AWS and other cloud providers.

### Google Cloud Setup
If you do not already have a Google Cloud account, head on over to [https://cloud.google.com/](https://cloud.google.com/) and click on the "TRY IT FREE" button to get a $300 credit. The following video shows the required steps for getting your free trial going on Google Cloud.

[video]

This demo will start a preemptible instance running Fusion 4.x, which will live at most for 24 hours. The run cost for this instance is about $1 a day, but your mileage may vary.

### Downloading and Starting the Demo
The demo instance is started by running a script which is checked out from Github using the `git` command from the Google Cloud Shell. To start a new shell, navigate to [https://console.cloud.google.com/](https://console.cloud.google.com/) and click on the `>_` button toward the top right of the screen.

Once you are in the Google Cloud Console, you can download the startup script from Github:

Command:
```
git clone https://github.com/lucidworks/streams
```

View:
```
$ git clone https://github.com/lucidworks/streams

