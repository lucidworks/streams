# a makefile

build:
	rm -rf *.tgz
	tar cvfz headless-pokedex-buttons.tgz *

clean:
	rm -rf *.tgz

upload:
	gsutil cp headless-pokedex-buttons.tgz gs://buttons-streams
