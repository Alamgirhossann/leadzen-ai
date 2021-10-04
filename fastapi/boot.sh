#!/bin/bash

echo "> ===================="
echo "> Environment Settings"
echo "> ===================="
env
echo "..."

echo "> ============================="
echo "> Activating Python Environment"
echo "> ============================="
source venv/bin/activate
echo "> Done"
echo "..."

#if [[ "$API_CONFIG_WAIT_FOR_DATABASE" == "1" ]];
#then
#    echo "> ==============================================="
#    echo ">> Waiting for Local Database to become available"
#    echo "> ==============================================="
#
#    ./wait_for_it.sh --host=postgres --port=5432 --timeout=90
#    #./wait_for_it.sh --host=pgadmin --port=80 --timeout=90
#
#    echo "> Done"
#    echo "..."
#fi

# echo "> =============================="
# echo "> Change owner for shared folder"
# echo "> =============================="
# sudo chown -R appuser:appuser /home/appuser/shared
# echo "> Done"
# echo "..."

echo "> ========================"
echo "> Making a few directories"
echo "> ========================"
mkdir "bulk" "bulk/incoming" "bulk/outgoing"
echo "> Done"
echo "..."

echo "> ============================================"
echo "> Checking if Alembic Migration already exists"
echo "> ============================================"
if [[ ! -d shared/alembic ]]; 
then
    echo "> Creating alembic directory"
    sudo mkdir /home/appuser/shared/alembic
    echo "> Changing owner of alembic directory"
    sudo chown -R appuser:appuser /home/appuser/shared/alembic
    echo "> Creating new Alembic Migration"
    alembic init shared/alembic
    echo "> Patching Alembic Migration"
    cp alembic.env.py shared/alembic/env.py    
    echo ">> Forcing sync to shared folder"
    sync
else
    echo ">> Alembic Migration already exists"
    echo "> Changing owner of alembic directory"
    sudo chown -R appuser:appuser /home/appuser/shared/alembic
fi
echo "> Done"
echo "..."

echo "> ==================="
echo "> Migrating Databases"
echo "> ==================="
TIMESTAMP=$(date +%s)

while true; 
do
    echo "> Starting migrations"
    alembic revision --autogenerate -m "database updates at $TIMESTAMP"
    alembic upgrade head
    # shellcheck disable=SC2181
    if [[ "$?" == "0" ]];
    then
        echo ">> Upgrade succeeded"
        echo "..."
        
        echo ">> Forcing sync to shared folder"
        sync
        echo ">> Done"

        echo "..."
        
        break
    else
        echo ">> Upgrade failed"
        
        echo "..."
    
        echo "> Retrying migration again"

        echo "..."
    fi
    echo ">> Upgrade command failed, retrying in 5 secs..."
    sleep 5
done

echo "..."

echo "..."
echo "> ======================="
echo "> Starting FastAPI Server"
echo "> ======================="
exec uvicorn app.main:app --host 0.0.0.0 --port 5000 --root-path /api

