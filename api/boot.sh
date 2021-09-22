#!/bin/bash
echo "> ================================="
echo "> Show Current Environment Settings"
echo "> ================================="
env
echo "> Done"
echo "..."

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
