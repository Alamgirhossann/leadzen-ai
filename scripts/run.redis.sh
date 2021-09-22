#!/bin/bash
cd scripts

docker compose rm --stop -v --force
docker compose up -d --remove-orphans

docker ps -a
docker compose logs