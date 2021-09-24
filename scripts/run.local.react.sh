# !/bin/bash
echo "> ----------------------"
echo "> Building Docker Images"
echo "> ----------------------"

echo "> -----------------------------"
echo "> Building FastAPI Docker Image"
echo "> -----------------------------"
cd fastapi
sudo ./scripts/build.docker.sh
if [ $? != 0 ]; then
    echo ">>> Unable to build FastAPI Docker Image"
    cd ..
    exit 1
fi
echo "> Done"
echo "..."


echo "> ---------------------------"
echo "> Building React Docker Image"
echo "> ---------------------------"
cd ../react
sudo ./scripts/build.docker.sh
if [ $? != 0 ]; then
    echo ">>> Unable to build React Docker Image"
    cd ..
    exit 1
fi
echo "> Done"
echo "..."

echo "> ----------------------------------------------------"
echo "> Copying FastAPI database definitions to External API"
echo "> ----------------------------------------------------"
cp fastapi/app/database.py api/app/database.py
echo "> Done"
echo "..."

echo "> ----------------------------------"
echo "> Building External API Docker Image"
echo "> ----------------------------------"
cd ../api
sudo ./scripts/build.docker.sh
if [ $? != 0 ]; then
    echo ">>> Unable to build External API Docker Image"
    cd ..
    exit 1
fi
echo "> Done"
echo "..."

cd ..

echo "> -------------------------------"
echo "> Finished Building Docker Images"
echo "> -------------------------------"

echo "> -----------------------------------"
echo "> Creating some directories if needed"
echo "> -----------------------------------"
if [[ ! -d shared/database/sqlite ]]; 
then
    echo "> Creating new new directories"
    mkdir -p shared/database/sqlite
fi
echo "> Done"
echo "..."


echo "> ---------------------------"
echo "> Running Built Docker Images"
echo "> ---------------------------"
sudo docker-compose -f docker-compose.dev.yml up --remove-orphans
