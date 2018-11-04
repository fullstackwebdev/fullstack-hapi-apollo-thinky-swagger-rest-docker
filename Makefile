build:
	@docker build -t backend .
#	@docker build -t frontend ./frontend/.
#        @docker build -t rontend-test frontend -f frontend/Dockerfile.test

run:
	@docker-compose up

stop:
	@docker-compose stop

clean:
	@docker-compose rm
	
clean-images:
	@docker rmi $(docker images -q --filter="dangling=true")


