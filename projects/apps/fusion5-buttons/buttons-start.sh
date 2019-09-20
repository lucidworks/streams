set -x

cd /
rm -rf fusion/

apt install kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl

sudo snap install helm --classic

function print_usage() {
  CMD="$1"
  ERROR_MSG="$2"

  if [ "$ERROR_MSG" != "" ]; then
    echo -e "\nERROR: $ERROR_MSG"
  fi

  echo -e "\nUse this script to install Fusion 5 on Kubernetes; optionally create a GKE cluster in the process\n"
  echo -e "\nUsage: $CMD -c <cluster> -r <release> -n <namespace> -p <project> -z <zone> -i <instance_type> --values <values> --create <mode> --upgrade --purge\n"
  echo -e "  -c          Name of the GKE cluster (required)\n"
  echo -e "  -p          GCP Project ID (required)\n"
  echo -e "  -r          Helm release name for installing Fusion 5, defaults to 'f5'\n"
  echo -e "  -n          Kubernetes namespace to install Fusion 5 into, defaults to 'default'\n"
  echo -e "  -z          GCP Zone to launch the cluster in, defaults to 'us-west1'\n"
  echo -e "  -b          GCS Bucket for storing ML models\n"
  echo -e "  -i          Instance type, defaults to 'n1-standard-4'\n"
  echo -e "  --values    Custom values file containing config overrides; defaults to my_custom_values.yaml\n"
  echo -e "  --create    Create a cluster in GKE; provide the mode of the cluster to create, one of: demo, multi_az, node_pools\n"
  echo -e "  --upgrade   Perform a Helm upgrade on an existing Fusion installation\n"
  echo -e "  --purge     Uninstall and purge all Fusion objects from the specified namespace and cluster\n"
}

SCRIPT_CMD="$0"
GCLOUD_PROJECT=
GCLOUD_ZONE=us-west1
CLUSTER_NAME=
RELEASE=f5
NAMESPACE=default
MY_VALUES=./my_custom_values.yaml
ARTIFACTORY_USER=gcloud_access
ARTIFACTORY_PASS='"L8b)\GdK$a5uYyL'
UPGRADE=0
GCS_BUCKET=
CREATE_MODE=
PURGE=0
INSTANCE_TYPE="n1-standard-4"

if [ $# -gt 0 ]; then
  while true; do
    case "$1" in
        -b)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the -b parameter!"
              exit 1
            fi
            GCS_BUCKET="$2"
            shift 2
        ;;
        -c)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the -c parameter!"
              exit 1
            fi
            CLUSTER_NAME="$2"
            shift 2
        ;;
        -n)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the -n parameter!"
              exit 1
            fi
            NAMESPACE="$2"
            shift 2
        ;;
        -p)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the -p parameter!"
              exit 1
            fi
            GCLOUD_PROJECT="$2"
            shift 2
        ;;
        -r)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the -r parameter!"
              exit 1
            fi
            RELEASE="$2"
            shift 2
        ;;
        -z)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the -z parameter!"
              exit 1
            fi
            GCLOUD_ZONE="$2"
            shift 2
        ;;
        -i)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the -i parameter!"
              exit 1
            fi
            INSTANCE_TYPE="$2"
            shift 2
        ;;
        --values)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the --values parameter!"
              exit 1
            fi
            MY_VALUES="$2"
            shift 2
        ;;
        --create)
            if [[ -z "$2" || "${2:0:1}" == "-" ]]; then
              print_usage "$SCRIPT_CMD" "Missing value for the --create parameter!"
              exit 1
            fi
            CREATE_MODE="$2"
            shift 2
        ;;
        --upgrade)
            UPGRADE=1
            shift 1
        ;;
        --purge)
            PURGE=1
            shift 1
        ;;
        -help|-usage)
            print_usage "$SCRIPT_CMD"
            exit 0
        ;;
        --)
            shift
            break
        ;;
        *)
            if [ "$1" != "" ]; then
              print_usage "$SCRIPT_CMD" "Unrecognized or misplaced argument: $1!"
              exit 1
            else
              break # out-of-args, stop looping
            fi
        ;;
    esac
  done
fi

if [ "$CREATE_MODE" != "" ] && [ "$UPGRADE" == "1" ]; then
  print_usage "$SCRIPT_CMD" "Must specify either the --create or --upgrade options but not both!"
  exit 1
fi

if [ "$CLUSTER_NAME" == "" ]; then
  print_usage "$SCRIPT_CMD" "Please provide the GKE cluster name using: -c <cluster>"
  exit 1
fi

if [ "$GCLOUD_PROJECT" == "" ]; then
  print_usage "$SCRIPT_CMD" "Please provide the GCP project name using: -p <project>"
  exit 1
fi

# verify the user is logged in ...
who_am_i=$(gcloud auth list --filter=status:ACTIVE --format="value(account)")
echo "$who_am_i"
if [ "$who_am_i" == "" ]; then
  echo -e "\nERROR: GCloud user unknown, please use: 'gcloud auth login <account>' before proceeding with this script!"
  exit 1
fi

hash kubectl
has_prereq=$?
if [ $has_prereq == 1 ]; then
  echo -e "\nERROR: Must install kubectl before proceeding with this script! For GKE, see: https://cloud.google.com/sdk/docs/"
  exit 1
fi

hash helm
has_prereq=$?
if [ $has_prereq == 1 ]; then
  echo -e "\nERROR: Must install helm before proceeding with this script! See: https://helm.sh/docs/using_helm/#quickstart"
  exit 1
fi

gcloud config set compute/zone $GCLOUD_ZONE
gcloud config set project $GCLOUD_PROJECT

if [ "$PURGE" == "1" ]; then
  gcloud container clusters get-credentials $CLUSTER_NAME
  current=$(kubectl config current-context)
  read -p "Are you sure you want to purge the ${RELEASE} release from the ${NAMESPACE} in: $current? This operation cannot be undone! y/n " confirm
  if [ "$confirm" == "y" ]; then
    helm del --purge ${RELEASE}
    kubectl delete deployments -l app.kubernetes.io/part-of=fusion --namespace "${NAMESPACE}" --grace-period=0 --force --timeout=5s
    kubectl delete job ${RELEASE}-api-gateway --namespace "${NAMESPACE}" --grace-period=0 --force --timeout=1s
    kubectl delete svc -l app.kubernetes.io/part-of=fusion --namespace "${NAMESPACE}" --grace-period=0 --force --timeout=2s
    kubectl delete pvc -l app.kubernetes.io/part-of=fusion --namespace "${NAMESPACE}" --grace-period=0 --force --timeout=5s
    kubectl delete pvc -l release=${RELEASE} --namespace "${NAMESPACE}" --grace-period=0 --force --timeout=5s
    kubectl delete pvc -l app.kubernetes.io/instance=${RELEASE} --namespace "${NAMESPACE}" --grace-period=0 --force --timeout=5s
  fi
  exit 0
fi

gcloud beta container clusters list --filter=${CLUSTER_NAME} | grep ${CLUSTER_NAME} > /dev/null 2>&1
cluster_status=$?
if [ "$cluster_status" != "0" ]; then
  echo -e "\nLaunching GKE cluster ${CLUSTER_NAME} ($CREATE_MODE) in project ${GCLOUD_PROJECT} zone ${GCLOUD_ZONE} for deploying Lucidworks Fusion 5 ...\n"

  if [ "$CREATE_MODE" == "demo" ]; then
    # have to cut off the zone part for the --subnetwork arg
    GCLOUD_REGION="$(cut -d'-' -f1 -f2 <<<"$GCLOUD_ZONE")"
    gcloud beta container --project "${GCLOUD_PROJECT}" clusters create "${CLUSTER_NAME}" --zone "${GCLOUD_ZONE}" \
      --no-enable-basic-auth --cluster-version "1.12.8-gke.10" --machine-type "${INSTANCE_TYPE}" --image-type "COS" \
      --disk-type "pd-standard" --disk-size "100" \
      --scopes "https://www.googleapis.com/auth/devstorage.full_control","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" \
      --num-nodes "1" --no-enable-cloud-logging --no-enable-cloud-monitoring --enable-ip-alias \
      --network "projects/${GCLOUD_PROJECT}/global/networks/default" \
      --subnetwork "projects/${GCLOUD_PROJECT}/regions/${GCLOUD_REGION}/subnetworks/default" \
      --default-max-pods-per-node "110" --enable-autoscaling --min-nodes "1" --max-nodes "2" \
      --addons HorizontalPodAutoscaling,HttpLoadBalancing --no-enable-autoupgrade --enable-autorepair
  elif [ "$CREATE_MODE" == "multi_az" ]; then
    gcloud beta container --project "${GCLOUD_PROJECT}" clusters create "${CLUSTER_NAME}" --region "${GCLOUD_ZONE}" \
      --no-enable-basic-auth --cluster-version "1.12.8-gke.10" --machine-type "${INSTANCE_TYPE}" \
      --image-type "COS" --disk-type "pd-standard" --disk-size "100" --metadata disable-legacy-endpoints=true \
      --scopes "https://www.googleapis.com/auth/devstorage.full_control","https://www.googleapis.com/auth/logging.write","https://www.googleapis.com/auth/monitoring","https://www.googleapis.com/auth/servicecontrol","https://www.googleapis.com/auth/service.management.readonly","https://www.googleapis.com/auth/trace.append" \
      --num-nodes "1" --enable-cloud-logging --enable-cloud-monitoring --enable-ip-alias \
      --network "projects/${GCLOUD_PROJECT}/global/networks/default" \
      --subnetwork "projects/${GCLOUD_PROJECT}/regions/${GCLOUD_ZONE}/subnetworks/default" \
      --default-max-pods-per-node "110" --enable-autoscaling --min-nodes "1" --max-nodes "2" \
      --addons HorizontalPodAutoscaling,HttpLoadBalancing --no-enable-autoupgrade --enable-autorepair
  else
    echo -e "\nNo --create arg provided, assuming you want a multi-AZ, multi-NodePool cluster ..."
    echo -e "Clusters with multiple NodePools not supported by this script yet! Please create the cluster and define the NodePools manually.\n"
    exit 1
  fi

  echo -e "\nCluster '${CLUSTER_NAME}' deployed ... testing if it is healthy"
  gcloud beta container clusters list --filter=${CLUSTER_NAME} | grep ${CLUSTER_NAME}
  cluster_status=$?
  if [ "$cluster_status" != "0" ]; then
    echo -e "\nERROR: Status of GKE cluster ${CLUSTER_NAME} is suspect, check the Google Cloud console before proceeding!\n"
    exit 1
  fi
else
  if [ "$UPGRADE" == "0" ]; then
    echo -e "\nGKE Cluster '${CLUSTER_NAME}' already exists, proceeding with Fusion 5 install ...\n"
  fi
fi

gcloud container clusters get-credentials $CLUSTER_NAME
kubectl config current-context

function proxy_url() {
  export PROXY_HOST=$(kubectl --namespace "${NAMESPACE}" get service proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
  export PROXY_PORT=$(kubectl --namespace "${NAMESPACE}" get service proxy -o jsonpath='{.spec.ports[?(@.protocol=="TCP")].port}')
  export PROXY_URL=$PROXY_HOST:$PROXY_PORT
  echo -e "\n\nFusion 5 Gateway service exposed at: $PROXY_URL\n"
  echo -e "WARNING: This IP address is exposed to the WWW w/o SSL! This is done for demo purposes and ease of installation.\nYou are strongly encouraged to configure a K8s Ingress with TLS, see:\n   https://cloud.google.com/kubernetes-engine/docs/tutorials/http-balancer"
  echo -e "\nAfter configuring an Ingress, please change the 'proxy' service to be a ClusterIP instead of LoadBalancer\n"
}

if [ "$GCS_BUCKET" != "" ]; then
  echo -e "Creating GCS bucket: $GCS_BUCKET"
  gsutil mb gs://${GCS_BUCKET}
fi

kubectl rollout status deployment/${RELEASE}-query-pipeline --timeout=10s > /dev/null 2>&1
rollout_status=$?
if [ $rollout_status == 0 ]; then
  if [ "$UPGRADE" == "0" ]; then
    echo -e "\nLooks like Fusion is already running ..."
    proxy_url
    exit 0
  fi
fi

if [ "$UPGRADE" == "0" ]; then
  kubectl create clusterrolebinding cluster-admin-binding --clusterrole=cluster-admin \
    --user=$(gcloud config get-value core/account)
fi

# see if Tiller is deployed ...
kubectl rollout status deployment/tiller-deploy --timeout=10s -n kube-system > /dev/null 2>&1
rollout_status=$?
if [ $rollout_status != 0 ]; then
  echo -e "\nSetting up Helm Tiller ..."
  kubectl create serviceaccount --namespace kube-system tiller
  kubectl create clusterrolebinding tiller-cluster-rule --clusterrole=cluster-admin --serviceaccount=kube-system:tiller
  helm init --service-account tiller --wait
  helm version
fi

stable_secret_name=artifactory-stable
stable_secret_server=fusion-stable-docker.ci-artifactory.lucidworks.com
stable_helm_repository="fusion-stable-helm"

echo -e "\nAdding the fusion stable chart repo to helm repo list"
helm repo list | grep "${stable_helm_repository}"
if [ $? ]; then
  helm repo add "${stable_helm_repository}" "https://artifactory.lucidworks.com/artifactory/${stable_helm_repository}" \
    --password ${ARTIFACTORY_PASS} --username ${ARTIFACTORY_USER}
fi

echo -e "\nChecking if the Artifactory secret is present in the namespace for pulling Docker images ..."

if kubectl --namespace "${NAMESPACE}" get secret "${stable_secret_name}" > /dev/null 2>&1; then
  echo -e "Secret is present, continuing with the installation\n"
else
  docker_username="$ARTIFACTORY_USER"
  docker_password="$ARTIFACTORY_PASS"
  kubectl create secret docker-registry "${stable_secret_name}" --namespace "${NAMESPACE}" --docker-server="${stable_secret_server}" \
    --docker-username=${docker_username} --docker-password=${docker_password} --docker-email=${docker_username}
fi

if [ ! -f $MY_VALUES ]; then
  touch $MY_VALUES
fi

echo -e "\nPulling the latest Helm updates ..."
helm repo update

if [ "$UPGRADE" == "1" ]; then
  echo -e "\nUpgrading the Fusion ${RELEASE} installation into the ${NAMESPACE} namespace ..."
  helm upgrade ${RELEASE} "${stable_helm_repository}/fusion" --timeout 180 --namespace "${NAMESPACE}" --values "${MY_VALUES}"
  upgrade_status=$?
  proxy_url
  exit $upgrade_status
fi

echo -e "\nInstalling Fusion 5.0 Helm chart ..."
helm install --timeout 180 --namespace "${NAMESPACE}" -n "${RELEASE}" --values "${MY_VALUES}" "${stable_helm_repository}/fusion"
kubectl rollout status deployment/${RELEASE}-api-gateway --timeout=600s --namespace "${NAMESPACE}"
kubectl rollout status deployment/${RELEASE}-fusion-admin --timeout=600s --namespace "${NAMESPACE}"

proxy_url

./setup_f5_cluster.sh -c aaa-marcus-fusion-5 -p "Labs" --create multi_az

export PROXY_HOST=$(kubectl --namespace "${NAMESPACE}" get service proxy -o jsonpath='{.status.loadBalancer.ingress[0].ip}')
