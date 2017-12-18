# makefile

kill: 
	$(eval KILLME = $(shell docker ps -q -f ancestor=bottle))
	-docker kill $(KILLME)

build: kill
	docker build -t bottle .

ngrok: build
	docker run -d -p 8080:8080 bottle; ngrok http 8080

run: build
	docker run -d -p 8080:8080 bottle

logs:
	$(eval LOGGME = $(shell docker ps -q -f ancestor=bottle))
	-docker logs $(LOGGME) 
