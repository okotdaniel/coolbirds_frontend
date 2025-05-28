PROJECT_NAME=frontend
CONTAINER_NAME=frontend_container
COMPOSE_FILE=infrastructure/docker/development/docker-compose.yaml
DOCKERFILE=infrastructure/docker/development/Dockerfile

.PHONY: build compose run log shell kubectl-apply-deploy kubectl-apply-configmap kubectl-apply-service

compose:
	docker compose -f $(COMPOSE_FILE) up 

build:
	docker build -t $(PROJECT_NAME) -f $(DOCKERFILE) .

run:
	docker run -p 3000:3000 -d --name $(CONTAINER_NAME) $(PROJECT_NAME)

log:
	docker logs -f $(CONTAINER_NAME)

shell:
	docker exec -it $(CONTAINER_NAME) bash

kubectl-apply-deploy:
	kubectl apply -f deployment.yaml

kubectl-apply-configmap:
	kubectl apply -f configmap.yaml

kubectl-apply-service:
	kubectl apply -f service.yaml
