#!/bin/bash

uvicorn fastapi_app.main:app --port=8000 --reload