#!/bin/bash

REMOTE_SERVER="ubuntu@3.7.37.62"
PEM_FILE="linux2-pinaki.pem"
CONTAINER_REGISTRY="480068984177.dkr.ecr.ap-south-1.amazonaws.com"
CONTAINER_REPOSITORY="analystt"

echo "------------------------------"
echo "--- Prod Deployment Script ---"
echo "------------------------------"

# -----------------------------------------------------------------------------------------------------------
# React - START -> build image -> push image to ecr ->  pull image from ecr to aws instance 
# -----------------------------------------------------------------------------------------------------------
PROJECT_NAME="person_react"

cd react || exit
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Unable to React Project Directory"
    exit 1
else
    echo "--- In React Project Directory ---"
fi

ROOT_DIRECTORY=$(pwd)
VERSION=$(date +%s)
DOCKER_IMAGE_NAME="$CONTAINER_REPOSITORY/$PROJECT_NAME"
CONTAINER_REGISTRY_IMAGE="$CONTAINER_REGISTRY/$DOCKER_IMAGE_NAME"


echo "*** $DOCKER_IMAGE_NAME Deployment Script ***"
echo "*** Remote Server: $REMOTE_SERVER"
echo "--------------------"
echo "--- Deploy Start ---"
echo "--------------------"


echo "-------------------------------------------------------"
echo "*** Adding, Committing, Tagging and Pushing Code to Git"
echo "-------------------------------------------------------"
# shellcheck disable=SC2035
git add *
git commit -am "Pre Prod-Deploy Checkin for $DOCKER_IMAGE_NAME-$VERSION"
git tag -a "v-$DOCKER_IMAGE_NAME-$VERSION" -m "Pre Prod-Deploy Tagging for $DOCKER_IMAGE_NAME"
echo  "--- Done Committing and Tagging ---"


echo "--------------------------"
echo "*** Building $DOCKER_IMAGE_NAME Docker Image and tagging as $CONTAINER_REGISTRY_IMAGE"
echo "--------------------------"
sudo docker build -t "$DOCKER_IMAGE_NAME":latest "$ROOT_DIRECTORY"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Build Error"
    exit 1
else
    echo "--- Done Building ---"
fi


sudo docker tag "$DOCKER_IMAGE_NAME":latest "$CONTAINER_REGISTRY_IMAGE":latest
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Tag Error"
    exit 1
else
    echo "--- Done Tagging ---"
fi


echo "------------------------"
echo "*** Pushing $DOCKER_IMAGE_NAME Image to Container Registry: $CONTAINER_REGISTRY"
echo "------------------------"
aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin "$CONTAINER_REGISTRY"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Login Error"
    exit 1
fi

sudo docker push "$CONTAINER_REGISTRY_IMAGE":latest
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Push Error"
    exit 1
else
    echo "--- Done Pushing to Registry ---"
fi


cd ..

echo "--------------------------------"
echo "*** Pulling $DOCKER_IMAGE_NAME Image from Container Registry: $CONTAINER_REGISTRY_IMAGE"
echo "--------------------------------"
# shellcheck disable=SC2029
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin $CONTAINER_REGISTRY; sudo docker pull $CONTAINER_REGISTRY_IMAGE:latest"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Pull Error"
    exit 1
else
    echo "--- Done Pulling from Registry ---"
fi
# ------------
# React - END 
# ------------


# -----------------------------------------------------------------------------------------------------------
# Fastapi - START -> build image -> push image to ecr ->  pull image from ecr to aws instance 
# -----------------------------------------------------------------------------------------------------------
PROJECT_NAME="person_fastapi"

cd fastapi || exit
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Unable to Find fastapi Project Directory"
    exit 1
else
    echo "--- In fastapi Project Directory ---"
fi

ROOT_DIRECTORY=$(pwd)
VERSION=$(date +%s)
DOCKER_IMAGE_NAME="$CONTAINER_REPOSITORY/$PROJECT_NAME"
CONTAINER_REGISTRY_IMAGE="$CONTAINER_REGISTRY/$DOCKER_IMAGE_NAME"


echo "*** $DOCKER_IMAGE_NAME Deployment Script ***"
echo "*** Remote Server: $REMOTE_SERVER"
echo "--------------------"
echo "--- Deploy Start ---"
echo "--------------------"


echo "-------------------------------------------------------"
echo "*** Adding, Committing, Tagging and Pushing Code to Git"
echo "-------------------------------------------------------"
# shellcheck disable=SC2035
git add *
git commit -am "Pre Deploy Checkin for $DOCKER_IMAGE_NAME-$VERSION"
git tag -a "v-$DOCKER_IMAGE_NAME-$VERSION" -m "Pre Deploy Tagging for $DOCKER_IMAGE_NAME"
echo  "--- Done Committing and Tagging ---"


echo "--------------------------"
echo "*** Building $DOCKER_IMAGE_NAME Docker Image and tagging as $CONTAINER_REGISTRY_IMAGE"
echo "--------------------------"
sudo docker build -t "$DOCKER_IMAGE_NAME":latest "$ROOT_DIRECTORY"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Build Error"
    exit 1
else
    echo "--- Done Building ---"
fi

sudo docker tag "$DOCKER_IMAGE_NAME":latest "$CONTAINER_REGISTRY_IMAGE":latest
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Tag Error"
    exit 1
else
    echo "--- Done Tagging ---"
fi


echo "------------------------"
echo "*** Pushing $DOCKER_IMAGE_NAME Image to Container Registry: $CONTAINER_REGISTRY"
echo "------------------------"
aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin "$CONTAINER_REGISTRY"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Login Error"
    exit 1
fi

sudo docker push "$CONTAINER_REGISTRY_IMAGE":latest
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Push Error"
    exit 1
else
    echo "--- Done Pushing to Registry ---"
fi

cd ..

echo "--------------------------------"
echo "*** Pulling $DOCKER_IMAGE_NAME Image from Container Registry: $CONTAINER_REGISTRY_IMAGE"
echo "--------------------------------"
# shellcheck disable=SC2029
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin $CONTAINER_REGISTRY; sudo docker pull $CONTAINER_REGISTRY_IMAGE:latest"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Pull Error"
    exit 1
else
    echo "--- Done Pulling from Registry ---"
fi
# --------------
# Fastapi - END 
# --------------


# -----------------------------------------------------------------------------------------------------------
# FastAPI External - START -> build image -> push image to ecr ->  pull image from ecr to aws instance 
# -----------------------------------------------------------------------------------------------------------
PROJECT_NAME="person_fastapi_external"

cd api || exit
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Unable to Find api Project Directory"
    exit 1
else
    echo "--- In fastapi Project Directory ---"
fi

ROOT_DIRECTORY=$(pwd)
VERSION=$(date +%s)
DOCKER_IMAGE_NAME="$CONTAINER_REPOSITORY/$PROJECT_NAME"
CONTAINER_REGISTRY_IMAGE="$CONTAINER_REGISTRY/$DOCKER_IMAGE_NAME"


echo "*** $DOCKER_IMAGE_NAME Deployment Script ***"
echo "*** Remote Server: $REMOTE_SERVER"
echo "--------------------"
echo "--- Deploy Start ---"
echo "--------------------"


echo "-------------------------------------------------------"
echo "*** Adding, Committing, Tagging and Pushing Code to Git"
echo "-------------------------------------------------------"
# shellcheck disable=SC2035
git add *
git commit -am "Pre Deploy Checkin for $DOCKER_IMAGE_NAME-$VERSION"
git tag -a "v-$DOCKER_IMAGE_NAME-$VERSION" -m "Pre Deploy Tagging for $DOCKER_IMAGE_NAME"
echo  "--- Done Committing and Tagging ---"


echo "--------------------------"
echo "*** Building $DOCKER_IMAGE_NAME Docker Image and tagging as $CONTAINER_REGISTRY_IMAGE"
echo "--------------------------"
sudo docker build -t "$DOCKER_IMAGE_NAME":latest "$ROOT_DIRECTORY"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Build Error"
    exit 1
else
    echo "--- Done Building ---"
fi

sudo docker tag "$DOCKER_IMAGE_NAME":latest "$CONTAINER_REGISTRY_IMAGE":latest
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Tag Error"
    exit 1
else
    echo "--- Done Tagging ---"
fi


echo "------------------------"
echo "*** Pushing $DOCKER_IMAGE_NAME Image to Container Registry: $CONTAINER_REGISTRY"
echo "------------------------"
aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin "$CONTAINER_REGISTRY"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Login Error"
    exit 1
fi

sudo docker push "$CONTAINER_REGISTRY_IMAGE":latest
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Push Error"
    exit 1
else
    echo "--- Done Pushing to Registry ---"
fi

cd ..

echo "---------------------------------------------------------------------------------------"
echo "*** Pulling $DOCKER_IMAGE_NAME Image from Container Registry: $CONTAINER_REGISTRY_IMAGE"
echo "---------------------------------------------------------------------------------------"
# shellcheck disable=SC2029
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "aws ecr get-login-password --region ap-south-1 | sudo docker login --username AWS --password-stdin $CONTAINER_REGISTRY; sudo docker pull $CONTAINER_REGISTRY_IMAGE:latest"
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker Registry Pull Error"
    exit 1
else
    echo "--- Done Pulling from Registry ---"
fi
# -----------------------
# FastAPI External - END 
# -----------------------



# -----------------------------------------------------------------------------------------------------------
# Push docker-compose and env file to aws -> bring down the docker instances -> bring up the docker instances
# -----------------------------------------------------------------------------------------------------------

echo "--------------------------------------------------"
echo "*** Copying Docker-Compose to Remote Server: $REMOTE_SERVER"
echo "--------------------------------------------------"
# shellcheck disable=SC2086
scp -i "$PEM_FILE" docker-compose.prod.yml "$REMOTE_SERVER":/home/ubuntu/docker-compose.yml
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> Docker-Compose File Upload Error <<<"
    exit 1
else
    echo "--- Done Uploading Docker-Compose File ---"
fi

echo "--------------------------------------------------"
echo "*** Copying Environment File to Remote Server: $REMOTE_SERVER"
echo "--------------------------------------------------"
# shellcheck disable=SC2086
scp -i "$PEM_FILE" .env "$REMOTE_SERVER":/home/ubuntu/.env
# shellcheck disable=SC2181
if [ $? != 0 ]; then
    echo ">>> .env File Upload Error <<<"
    exit 1
else
    echo "--- Done Uploading .env File ---"
fi

echo "-------------------------"
echo "*** Create shared direcories and files on Remote Server: $REMOTE_SERVER"
echo "-------------------------"
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "mkdir shared; touch shared/test.db"


echo "-------------------------"
echo "*** Show Docker status on $REMOTE_SERVER"
echo "-------------------------"
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "sudo docker-compose ps"


echo "----------------------------------------"
echo "*** Stop and remove all Docker containers on $REMOTE_SERVER"
echo "----------------------------------------"
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "sudo docker-compose down"


echo "---------------------------"
echo "*** Start new Docker Images"
echo "---------------------------"
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "sudo docker-compose up -d --remove-orphans"


echo "-------------------------"
echo "*** Show Docker status on $REMOTE_SERVER"
echo "-------------------------"
ssh "$REMOTE_SERVER" -i "$PEM_FILE" "sudo docker-compose ps"


echo "--------------------"
echo "---  Deploy End  ---"
echo "--------------------"