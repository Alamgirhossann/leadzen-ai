#!/bin/bash


cd react
sudo docker build -f ./Dockerfile.dev -t analystt/person_react:latest .

cd ..

cd fastapi
sudo docker build -t analystt/person_fastapi:latest .

cd ..

sudo docker stop  person_react  person_fastapi
sudo docker rm  person_react  person_fastapi

sudo docker-compose -f docker-compose.dev.yml up --remove-orphans
