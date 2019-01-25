set -x

# Steps:
#   Download and install Apache Superset
#     - TODO: need to included Superset distro here

#   Download and install Lucidworks Fusion
#     - done (Fusion already assumed running at this point in the script)

#   Configure Lucidworks Fusion to work in `binary` mode.
#     - TODO: config file tinkering

#   Spin up Apache Superset and Lucidworks Fusion.
#     - TODO: start Superset
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
