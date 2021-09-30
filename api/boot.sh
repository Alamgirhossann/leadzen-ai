#!/bin/bash
echo "> ================================="
echo "> Show Current Environment Settings"
echo "> ================================="
env
echo "> Done"
echo "..."

echo "> ========================================================"
echo "> Checking and waiting for person_fastapi to become active"
echo "> ========================================================"
./wait_for_it.sh --host=person_fastapi --port=5000 --timeout=90
# shellcheck disable=SC2181
if [[ "$?" == "0" ]];
then
    echo "> person_fastapi is up and running, proceeding"
    echo "Done"
    echo "..."        
else
    echo "> person_fastapi is not up for the past 1 min"
    echo "> Exiting"
    exit 1
fi

echo "> ============================="
echo "> Activating Python Environment"
echo "> ============================="
source venv/bin/activate
echo "> Done"
echo "..."

echo "> ============================="
echo "> Change owner for shared folder"
echo "> ============================="
sudo chown appuser:appuser /home/appuser/shared
echo "> Done"

echo "..."
echo "> ========================"
echo "> Patching a few libraries"
echo "> ========================"
cp patches/fastapi_limiter/depends.py venv/lib/python3.9/site-packages/fastapi_limiter/depends.py
echo "> Done"
echo "..."

echo "> ======================="
echo "> Starting FastAPI Server"
echo "> ======================="
exec uvicorn app.main:app --host 0.0.0.0 --port 5000
