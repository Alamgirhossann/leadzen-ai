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
echo "> Checking and waiting for postgres to become active"
    ./wait_for_it.sh --host=postgres --port=5432 --timeout=60
    # shellcheck disable=SC2181
    if [[ "$?" == "0" ]];
    then
        echo "> postgres is up and running, proceeding"
        echo "Done"
        echo "..."
    else
        echo "> postgres is not up for the past 1 min"
        echo "> Exiting"
        exit 1
    fi
echo "> ============================="
echo "> Copying shared migrations folder"
echo "> ============================="
TIMESTAMP=$(date +%s)
mv alembic alembic
cp -r ./alembic alembic
sync
echo "> Done"

echo "..."

echo "> ============================="
echo "> Migrating Databases"
echo "> ============================="
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
          mv ./alembic ./alembic."$TIMESTAMP"
          echo ">> Done"

          echo "..."

          echo ">> Copying current migrations to shared for use in later upgrades"
          cp -rf ./alembic ./
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
#          cp -rf ./alembic ./
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
echo "> ======================="
echo "> Starting FastAPI Server"
echo "> ======================="
exec uvicorn app.main:app --host 0.0.0.0 --port 5000 --root-path /api

