# !/bin/bash
echo "-----------------------------"
echo "Building Docker Images"
cd fastapi
sudo ./scripts/build.docker.sh

cd ../react
sudo ./scripts/build.docker.sh
echo "-----------------------------"

cd ..
echo "Building Docker-Compose Containers"
# sudo docker-compose build
echo "----------------------------------"

echo "Finished Building Docker Images"
echo "------------------------------"

echo "Running Docker Container"
echo "-------------------------------"
sudo docker-compose -f docker-compose.dev.yml up