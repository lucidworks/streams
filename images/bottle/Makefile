	# makefile

kill: 
	$(eval KILLME = $(shell docker ps -q -f ancestor=bottle))
	-docker kill $(KILLME)

build: kill
	docker build -t bottle .

ngrok: build
	docker run -d -p 8082:8082 bottle; ngrok http 8082

run: build
	docker run -d -p 8082:8082 bottle

logs:
	$(eval LOGGME = $(shell docker ps -q -f ancestor=bottle))
	-docker logs $(LOGGME) 
