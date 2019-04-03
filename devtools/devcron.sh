#!/bin/bash
cd ..
while [ 1 ] 
do
  echo "Running tasks"
  curl -s http://0.0.0.0:8079/instance/tender
  # curl -s http://0.0.0.0:8079/instance/hotstarts
  echo "Running in 60"
  sleep 30
  echo "Running in 30"
  sleep 15
  echo "Running in 15"
  sleep 5
  echo "Running in 10"
  sleep 5
  echo "Running in 5"
  sleep 2
  echo "Running in 3"
  sleep 1
  echo "Running in 2"
  sleep 1
  echo "Running in 1"
  sleep 1
done
