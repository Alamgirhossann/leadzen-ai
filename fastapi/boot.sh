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

echo "> =============================="
echo "> Change owner for shared folder"
echo "> =============================="
sudo chown appuser:appuser /home/appuser/shared
echo "> Done"
echo "..."

echo "> ========================"
echo "> Making a few directories"
echo "> ========================"
mkdir "bulk" "bulk/incoming" "bulk/outgoing"
echo "> Done"
echo "..."

echo "> ================================"
echo "> Copying shared migrations folder"
echo "> ================================"
mv alembic alembic."$TIMESTAMP"
cp -r ./shared/alembic alembic
sync
echo "> Done"

echo "..."

echo "> ==================="
echo "> Migrating Databases"
echo "> ==================="
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
        
        echo ">> Moving existing migrations to a timestamped folder"        
        mv ./shared/alembic ./shared/alembic."$TIMESTAMP"
        echo ">> Done"

        echo "..."
        
        echo ">> Copying current migrations to shared for use in later upgrades"
        cp -rf alembic ./shared/
        echo ">> Done"
        
        echo "..."
        
        echo ">> Forcing sync to shared folder"
        sync
        echo ">> Done"

        echo "..."
        
        break
    else
        echo ">> Upgrade failed"
        
        echo "..."
    
        echo "> re-copying shared migrations folder"
        cp -rf ./shared/alembic alembic
        echo ">> Done"

        echo "..."

        echo ">> Forcing sync from shared folder"
        sync
        echo ">> Done"

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

