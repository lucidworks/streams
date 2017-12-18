#!/bin/bash
curl -X DELETE https://api.wisdom.sh/api/bottle/
curl -X POST \
  --url https://api.wisdom.sh/api/ \
  --data 'name=bottle' \
  --data 'upstream_url=http://'$1':8080/' \
  --data 'uris=/bottle' \
  | python -m json.tool
curl -X DELETE https://api.wisdom.sh/api/fusion/
curl -X POST \
  --url https://api.wisdom.sh/api/ \
  --data 'name=fusion' \
  --data 'upstream_url=http://'$2':8764/' \
  --data 'uris=/fusion' \
  | python -m json.tool