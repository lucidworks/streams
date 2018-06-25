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
