#!/bin/bash

echo "would install"

clear

echo "==================================="
echo "Starting setup for a new site."
echo "==================================="

# make a new copy of the config.py template
cp config.py.template config.py

# admin port
admin_port=$1
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/ADMIN_PORT/'$admin_port'/g' config.py
else
  sed -i '' 's/ADMIN_PORT/'$admin_port'/g' config.py
fi

# local dev service port
service_port=$2
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/SERVICE_PORT/'$service_port'/g' config.py
else
  sed -i '' 's/SERVICE_PORT/'$service_port'/g' config.py
fi

# random 32 character string generator
randstring() {
  if [[ -z $1 ]]; then
    len=32
  else
    len=$1
  fi
  openssl rand -hex $len | head -c$len
}

# webapp2 secret_key
secret_key=$(randstring)
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/SECRET_KEY/'$secret_key'/g' config.py
else
  sed -i '' 's/SECRET_KEY/'$secret_key'/g' config.py
fi

echo;
# contact form emails
read -p "Enter the email address to use for the pool contact form emails: " email
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/CONTACT_EMAIL/'$email'/g' config.py
else
  sed -i '' 's/CONTACT_EMAIL/'$email'/g' config.py
fi

echo;
# instructions
echo "==================================="
echo "Hit <enter> to skip unused handles."
echo "==================================="

echo;
# twitter
read -p "Enter the Twitter handle for this pool: " twitter
if [[ twitter = "" ]]; then
  twitter = "NONE"
fi
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/TWITTER_HANDLE/'$twitter'/g' config.py
else
  sed -i '' 's/TWITTER_HANDLE/'$twitter'/g' config.py
fi

echo;
# linkedin
read -p "Enter the LinkedIn handle for this pool: " linkedin
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/LINKEDIN_HANDLE/'$linkedin'/g' config.py
else
  sed -i '' 's/LINKEDIN_HANDLE/'$linkedin'/g' config.py
fi

echo;
# google plus
read -p "Enter the Google Plus handle for this pool: " googleplus
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/GOOGLE_PLUS_HANDLE/'$googleplus'/g' config.py
else
  sed -i '' 's/GOOGLE_PLUS_HANDLE/'$googleplus'/g' config.py
fi

# aes and salt
aes_key=$(randstring)
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/AES_KEY/'$aes_key'/g' config.py
else
  sed -i '' 's/AES_KEY/'$aes_key'/g' config.py
fi

salt=$(randstring)
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/SALT/'$salt'/g' config.py
else
  sed -i '' 's/SALT/'$salt'/g' config.py
fi

# job token generation
job_token=$(randstring)
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/JOB_TOKEN/'$job_token'/g' config.py
else
  sed -i '' 's/JOB_TOKEN/'$job_token'/g' config.py
fi

echo;
# captcha input
echo "Visit http://www.google.com/recaptcha to get your public and private captcha keys."
read -p "Enter the public captcha key: " public_captcha
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/PUBLIC_CAPTCHA/'$public_captcha'/g' config.py
else
  sed -i '' 's/PUBLIC_CAPTCHA/'$public_captcha'/g' config.py
fi
read -p "Enter the private captcha key: " private_captcha
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/PRIVATE_CAPTCHA/'$private_captcha'/g' config.py
else
  sed -i '' 's/PRIVATE_CAPTCHA/'$private_captcha'/g' config.py
fi

echo;
# google analytics setup
echo "Visit http://www.google.com/analytics to get your GA code."
read -p "Enter the GA code: " ga_code
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/GA_CODE/'$ga_code'/g' config.py
else
  sed -i '' 's/GA_CODE/'$ga_code'/g' config.py
fi

# long ass key
rand_key=$(randstring 64)
if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/RAND_KEY/'$rand_key'/g' config.py
else
  sed -i '' 's/RAND_KEY/'$rand_key'/g' config.py
fi

echo;

# enable_federated_login
read -p "Should federated login be enabled for this pool (Y/n): " enable_federated_login
if [[ "${enable_federated_login/n/N}" == "N" ]]
then
  enable_federated_login="False"
else
  enable_federated_login="True"
fi

if [[ $OSTYPE == 'linux-gnu' ]]; then
  sed -i 's/ENABLE_FEDERATED_LOGIN/'$enable_federated_login'/g' config.py
else
  sed -i '' 's/ENABLE_FEDERATED_LOGIN/'$enable_federated_login'/g' config.py
fi
echo;

# app id setup for appengine
echo "Remember, your app needs to support federated logins on AppEngine!"
