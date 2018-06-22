#!/bin/bash

option="$1"
PREEMPTIBLE="--preemptible"
case $option in
    -p|--prod|--production)
    unset PREEMPTIBLE
esac

if [ -f secrets.sh ]; then
   source secrets.sh # truly, a travesty
   echo "Here's where I say, hold on a second while we fire things up."
   echo;

   if [ -n "$PREEMPTIBLE" ]; then
       echo "If you need a permanent version of this server, run the following:"
       echo "./start-sockitter.sh --production"
   else
       echo "Starting a production version of sockitter..."
   fi

else
   echo "TODO List"
   echo "1. Edit 'secrets-sample.sh' with your Twitter credentials.";
   echo "   Example: 'vi secrets-sample.sh'";
   echo;
   echo "2. Copy the file to 'secrets.sh'.";
   echo "   Example: 'cp secrets-sample.sh secrets.sh'.";
   echo;
   echo "3. Rerun this script, './start-sockitter.sh'.";
   exit;
fi

NEW_UUID=$(cat /dev/urandom | tr -dc 'a-z0-9' | fold -w 4 | head -n 1)
ZONE=us-west1-c

cp server-sample.sh server.sh
sed -i "
s,%ACCESS_TOKEN%,$ACCESS_TOKEN,g;
s,%SECRET_TOKEN%,$SECRET_TOKEN,g;
s,%CONSUMER_KEY%,$CONSUMER_KEY,g;
s,%CONSUMER_SECRET%,$CONSUMER_SECRET,g;
s,%FUSION_PASSWORD%,$FUSION_PASSWORD,g;
s,%GOOGLE_API_KEY%,$GOOGLE_API_KEY,g;
" server.sh

gcloud compute instances create fusion-sockitter-$NEW_UUID \
--machine-type "n1-standard-4" \
--image "ubuntu-1604-xenial-v20180522" \
--image-project "ubuntu-os-cloud" \
--boot-disk-size "50" \
--boot-disk-type "pd-ssd" \
--boot-disk-device-name "$NEW_UUID" \
--zone $ZONE \
--labels type=fusion\
--tags lucid \
$PROD \
--metadata-from-file startup-script=server.sh

sleep 15

IP=$(gcloud compute instances describe fusion-sockitter-$NEW_UUID --zone $ZONE  | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')
gcloud compute firewall-rules create fusion --allow tcp:8763
gcloud compute firewall-rules create fusion-appkit --allow tcp:8080
gcloud compute firewall-rules create fusion-webapp --allow tcp:8780

echo "Thank you for running me. Here's what I know:"
echo "Fusion UI available in a few minutes at: http://$IP:8764"
echo "Admin UI available in a few minutes at: http://$IP:8780/sockitter-editor/"
echo "API Docs are here: https://doc.lucidworks.com/fusion-server/4.0/index.html"

