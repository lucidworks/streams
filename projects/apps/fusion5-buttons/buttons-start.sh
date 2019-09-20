set -x

./setup_f5_cluster.sh -c aaa-marcus-fusion-5 -p "Labs" --create multi_az

export PROXY_HOST=$(kubectl --namespace "${NAMESPACE}" get service proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
