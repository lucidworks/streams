IP=$(gcloud compute instances describe | grep natIP | cut -d: -f2 | sed 's/^[ \t]*//;s/[ \t]*$//')
