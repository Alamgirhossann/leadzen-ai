#!/bin/bash

uvicorn app.main:app --host 0.0.0.0 --port 12008 --reload