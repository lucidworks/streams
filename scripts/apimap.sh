curl -X POST \
  --url https://api.wisdom.sh/api/ \
  --data 'name=bottle2' \
  --data 'upstream_url=http://10.27.251.126:8081/' \
  --data 'uris=/bottle2' \
  | python -m json.tool
