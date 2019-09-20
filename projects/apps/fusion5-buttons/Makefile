# the makefile

build:
	rm -rf fusion5-buttons.tgz
	tar cvfz fusion5-buttons.tgz *

clean:
	rm -rf fusion5-buttons.tgz

upload:
	gsutil cp fusion5-buttons.tgz gs://buttons-streams
