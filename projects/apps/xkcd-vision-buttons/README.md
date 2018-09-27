# XKCD Vision
This application runs on Fusion 4.1.0. The application is preconfigured to crawl and index the webcomic XKCD, which is written by Randall Munroe and located at https://xkcd.com/.

## Starting on Lucidworks Labs
To start the [XKCD Vision](https://lucidworks.com/labs/apps/xkcd-vision/) application on [Lucidworks Labs](https://lucidworks.com/labs), click on the button below.

[![Launch XKCD Vision](https://img.shields.io/badge/launch-XKCDVision-green.svg)](https://streams.lucidworks.com/instance/create/xkcdvision)

You will be prompted to login with Github and then given a demo instance to access.

## Starting on Fusion
To load the XKCD Vision application on an existing deployment of Fusion 4.1.0, download the ZIP file in this directory and then click on the "Import App" button in the Fusion Admin Launcher screen. Select the ZIP file and click import to load the application into the instance of Fusion.

## Google Vision API
The use of Google's Vision API is optional, but does add some additional relevant data to the demo if used. To add the Google Vision APIs to your GCP account, navigate to [API Library](https://console.cloud.google.com/apis/library) for your particular project and search for 'Cloud Vision API'.

Click on the Cloud Vision API card and then click on the enable button to enable the APIs for your GCP account.

To create an auth token to place into Fusion's indexing pipeline REST stage, navigate to your [API credentials page](https://console.cloud.google.com/apis/credentials) and click create credentials..API key and then restrict the new key to the Cloud Vision API. Copy the key and then paste it in the key field in the Google Vision REST pipeline. 

## Video Guide
Here is a video guide for this application:

[![ROBOT OVERLORDS ARE COMING](https://img.youtube.com/vi/1hDeoISjoxw/0.jpg)](https://www.youtube.com/watch?v=1hDeoISjoxw)
