set -x

# Steps:
#   Download and install Apache Superset
#     - TODO: need to included Superset distro here

#install core utilities
sudo apt-get install build-essential libssl-dev libffi-dev python-dev python-pip libsasl2-dev libldap2-dev

#install virtualenv
sudo apt install python3-venv

#name that virtual environment
pyvenv my_venv

#activate the virtual environment
source my_env/bin/activate

#install setuptools in the virtual env
pip install --upgrade setuptools pip

# pull the superset master from github.
git clone https://github.com/apache/incubator-superset.git

#pull in dependencies
pip install -r requirements.txt

#pull in dependencies
pip install -r requirements-dev.txt

#editable mode

pip install -e .
pip install python-dotenv

# create a user
fabmanager create-admin --app superset

# Initialize the database
superset db upgrade

# Load some data to play with
superset load_examples

# Create default roles and permissions
superset init

# To start a development web server on port 8088, use -p to bind to another port


#   Download and install Lucidworks Fusion
#     - done (Fusion already assumed running at this point in the script)

#   Configure Lucidworks Fusion to work in `binary` mode.
#     - TODO: config file tinkering

#   Spin up Apache Superset and Lucidworks Fusion.
#     - TODO: start Superset
superset runserver -d
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
