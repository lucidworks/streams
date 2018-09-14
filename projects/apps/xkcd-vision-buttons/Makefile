# a makefile

build:
	rm -rf *.tgz
	tar cvfz xkcd-vision-buttons.tgz *

clean:
	rm -rf *.tgz

upload:
	gsutil cp xkcd-vision-buttons.tgz gs://buttons-streams
