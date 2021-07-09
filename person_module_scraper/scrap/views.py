from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
import re
from .get_data import GetData
from loguru import logger
from collections import ChainMap
from datetime import datetime
from file_upoad.models import FileTable
from .models import *
from django.contrib.auth.models import User, auth
import json
from rest_framework.decorators import api_view
from loguru import logger
import requests
from django.contrib import messages
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
import traceback
import time
import ast
import sys
import trace
from sentry_sdk import capture_exception
from threading import Thread, current_thread
import threading
from concurrent.futures import ThreadPoolExecutor as thread

# for generating the csv file
import csv

threads = []


class KThread(threading.Thread):
    """A subclass of threading.Thread, with a kill()
    method."""

    def __init__(self, *args, **keywords):
        threading.Thread.__init__(self, *args, **keywords)
        self.killed = False

    def start(self):
        """Start the thread."""
        self.__run_backup = self.run
        self.run = self.__run
        threading.Thread.start(self)

    def __run(self):
        """Hacked run function, which installs the
        trace."""
        sys.settrace(self.globaltrace)
        self.__run_backup()
        self.run = self.__run_backup

    def globaltrace(self, frame, why, arg):
        if why == "call":
            return self.localtrace
        else:
            return None

    def localtrace(self, frame, why, arg):
        if self.killed:
            if why == "line":
                raise SystemExit()
        return self.localtrace

    def kill(self):
        self.killed = True


@api_view(["GET"])
def scrap(request, id):
    stop_threads = False
    status = "pending"
    action = request.query_params.get("action", "")
    try:
        file_obj = FileTable.objects.get(id=id, user=request.user)
        file_url = file_obj.file.url
        file_name = os.path.basename(file_url)
        col = file_obj.col_name
        scrapper = GetData(
            file_url=file_url,
            file_name=file_name,
            file_id=id,
            col_name=col,
            current_file=file_obj,
            current_user=request.user,
        )
        names = [t for t in threads if file_name == t["name"]]
        if names and action == "stop":
            logger.info(f"Killing {names[0]['name']}")
            names[0]["th"].kill()
            threads.remove(threads[threads.index(names[0])])
            FileTable.objects.filter(id=id, user=request.user).update(status="stopped")
        else:
            logger.info(f"START  FILE: {file_name}  TIME: {datetime.now()}")
            file_location = (
                os.path.join(settings.BASE_DIR, "download", "download_" + str(id))
                + ".csv"
            )
            FileTable.objects.filter(id=id, user=request.user).update(
                status="pocessing"
            )
            if os.path.exists(file_location):
                os.remove(file_location)
            t = KThread(target=scrapper.extract_data)
            t.name = file_name
            t.start()
            threads.append({"th": t, "name": t.getName()})
        return redirect("/result")
    except Exception as e:
        trace_back = sys.exc_info()[2]
        line = trace_back.tb_lineno
        logger.error(f"Error: {e} line: {line}")
        capture_exception(e)
        messages.error(request, "Internal Server error")
        return redirect("/result")
