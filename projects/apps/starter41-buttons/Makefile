# a makefile

build:
	rm -rf *.tgz
	tar cvfz starter412-buttons.tgz *

clean:
	rm -rf *.tgz

upload:
	gsutil cp starter412-buttons.tgz gs://buttons-streams
