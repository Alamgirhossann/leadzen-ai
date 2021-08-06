#!/bin/bash
echo "> ============================="
echo "> Environment Settings"
echo "> ============================="
env
echo "> ============================="
echo "..."
echo "..."
echo "..."
echo "> ============================="
echo "> Activating Python Environment"
echo "> ============================="
source venv/bin/activate
echo "> Done"
echo "..."
echo "..."
echo "..."
echo "> ============================="
echo "> Starting FastAPI Server"
echo "> ============================="
exec uvicorn fastapi_app.main:app --host 0.0.0.0 --port 5000

