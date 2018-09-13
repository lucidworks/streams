# a makefile

build:
	rm -rf *.tgz
	tar cvfz starter41-buttons.tgz *

clean:
	rm -rf *.tgz

upload:
	gsutil cp starter41-buttons.tgz gs://buttons-streams
