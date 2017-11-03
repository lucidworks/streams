# makefile

kill: 
	$(eval KILLME = $(shell docker ps -q -f ancestor=bottle))
	-docker kill $(KILLME)

build: kill
	docker build -t bottle .

run: build
	docker run -d -p 8080:8080 bottle

logs:
	$(eval LOGGME = $(shell docker ps -q -f ancestor=bottle))
	-docker logs $(LOGGME) 
