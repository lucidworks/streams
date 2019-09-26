# a makefile

# listen ports
PORT=8079
ADMIN_PORT=8088

# app info
APP=$(shell grep 'application:' app.yaml | sed -e 's/^application:\s*//g')
BRANCH=master

serve:
	dev_appserver.py --enable_console --host=0.0.0.0 --port=$(PORT) --admin_host=0.0.0.0 --admin_port=$(ADMIN_PORT) ./

install:
	./install.sh $(ADMIN_PORT)

push:
	git push

upload:
	git pull
	gcloud app deploy app.yaml --project labs-3-datastore-dep

upload_cron:
	git pull # pull for legacy functionality in upload
	gcloud app deploy cron.yaml

cron:
	./devtools/devcron.sh
