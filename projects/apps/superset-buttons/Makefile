# the makefile

build:
	rm -rf superset-buttons.tgz
	tar cvfz superset-buttons.tgz *

clean:
	rm -rf superset-buttons.tgz

upload:
	gsutil cp superset-buttons.tgz gs://buttons-streams
