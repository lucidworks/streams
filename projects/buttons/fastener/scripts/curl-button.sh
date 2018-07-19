#!/bin/bash
source ../secrets.sh
curl -X POST http://35.230.26.45/api/stream/lou?token=$TOKEN
