PROJECT_NAME=coolbirds_frontend
CONTAINER_NAME=coolbirds_frontend_container

build:
	docker build -t $(PROJECT_NAME)

run:
	docker run -p 3000 -d --name $(CONTAINER_NAME) $(PROJECT_NAME) 

log:
	docker logs -f $(CONTAINER_NAME)

shell:
	docker exec -it $(CONTAINER_NAME) bash 
