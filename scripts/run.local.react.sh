# !/bin/bash
echo "-----------------------------"
echo "Building React Docker Container"
sudo docker-compose build

echo "------------------------------"
echo "Finished Building Container"
echo "Running Docker Container"
echo "-------------------------------"
sudo docker-compose up