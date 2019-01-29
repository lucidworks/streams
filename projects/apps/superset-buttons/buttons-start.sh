set -x

# Steps:
#   Download and install Apache Superset
#     - TODO: need to included Superset distro here

#install core utilities
sudo apt-get install -y build-essential libssl-dev libffi-dev python-dev python-pip libsasl2-dev libldap2-dev


# install custom package repo to enable python3.6 to run on Ubuntu 16.0.4
add-apt-repository -y ppa:jonathonf/python-3.6  # (remove after 16.04)

# install python for Superset
apt install -y python3.6
apt install -y python3.6-dev
apt install -y python3.6-venv

#although pip should be installed  with python 3 download it in case it is not
wget https://bootstrap.pypa.io/get-pip.py
python3.6 get-pip.py

# change symbolic links
rm -rf /usr/local/bin/python3
#rm -rf /usr/local/bin/pip
ln -s /usr/bin/python3.6 /usr/local/bin/python3
#ln -s /usr/local/bin/pip /usr/local/bin/pip3

# download virtual environment
pip install virtualenv

# create a folder to hold the environment
mkdir python_environment
cd python_environment

# name that virtual environment
pyvenv my_venv

# activate the virtual environment
source my_env/bin/activate

# install setuptools in the virtual env
pip install --upgrade setuptools pip

#install superset so the commands are available
pip install superset

# pull the superset master from github.
git clone https://github.com/apache/incubator-superset.git

# cd into appropriate directory
cd incubator-superset

#pull in dependencies
pip install -r requirements.txt

#pull in dependencies
pip install -r requirements-dev.txt

#editable mode

pip install -e .
pip install python-dotenv

# create a user
fabmanager create-admin --app superset --username admin --firstname admin --lastname admin --email admin@fab.org --password fus1onpow3r

# Initialize the database
superset db upgrade

# Load some data to play with
superset load_examples

# Create default roles and permissions
superset init

# To start a development web server on port 8088, use -p to bind to another port


#   Download and install Lucidworks Fusion
#     - done (Fusion already assumed running at this point in the script)
# replace line in /fusion/conf/fusion.properties

#   Configure Lucidworks Fusion to work in `binary` mode.
#     - TODO: config file tinkering

#   Spin up Apache Superset and Lucidworks Fusion.
#     - TODO: start Superset
#superset runserver -d
FLASK_ENV=development flask run -p 8789 --with-threads --reload --debugger

#     - TODO: restart Fusion?

#   Create an app in Lucidworks Fusion and index data so that you have at least one collection.
#     - TODO: include app here, that has a blob datasource
#     - TODO: start the datasource here?

#   Connect to Lucidworks Fusion to Superset in the Superset UI and add tables from your Fusion collection into Superset.
#     - TODO: can we bake this into some pre-installed Superset config?

#   Create Your First Chart
#     - TODO: can we bake this in?

# Diagnostics
python --version

diff -r fusion_conf/conf /fusion/conf
