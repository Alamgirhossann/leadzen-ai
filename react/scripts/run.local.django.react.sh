#!/bin/bash

cd django
sudo docker build -t analystt/django:latest .

cd ..

cd react
sudo docker build -f ./Dockerfile.dev -t analystt/react:latest .

cd ..

cd fastapi
sudo docker build -t analystt/fastapi:latest .

cd ..

sudo docker stop django react meilisearch fastapi
sudo docker rm django react meilisearch fastapi

sudo docker-compose -f docker-compose.dev.yml up --remove-orphans
