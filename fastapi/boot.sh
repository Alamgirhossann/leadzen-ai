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
mkdir "bulk" "bulk/incoming" "bulk/outgoing"
exec uvicorn app.main:app --host 0.0.0.0 --port 5000 --root-path /api

