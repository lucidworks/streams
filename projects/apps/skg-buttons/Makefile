# a makefile

build:
	rm -rf *.tgz
	tar cvfz skg-buttons.tgz *

clean:
	rm -rf *.tgz

upload:
	rm -rf *.tgz
	tar cvfz skg-buttons.tgz *
	gsutil cp skg-buttons.tgz gs://buttons-streams
