from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage
from django.conf import settings
import os
from loguru import logger
from datetime import datetime
from .models import FileTable
from django.contrib.auth.models import User, auth
import re
from rest_framework.decorators import api_view
from loguru import logger
import csv
from django.core.paginator import Paginator, PageNotAnInteger, EmptyPage
import pandas as pd
from django.contrib import messages
from django.http import HttpResponse
from sentry_sdk import capture_exception

# Create your views here.
@api_view(["GET"])
def home(request):
    return render(request, "home.html")


@api_view(["GET"])
def download(request, id):
    try:
        file_path = os.path.join(settings.BASE_DIR, "download", f"download_{id}.csv")
        response = HttpResponse(content_type="text/csv")
        cd = "attachment;filename={}".format("data.csv")
        response["Content-Disposition"] = cd
        with open(file_path, "r", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            data = list(reader)
        fields = tuple(data[0].keys())
        writer = csv.DictWriter(response, fieldnames=fields)
        writer.writeheader()
        for row in data:
            writer.writerow(row)
        return response
    except Exception as e:
        logger.error(e)
        messages.error(request, "Failed to dowload")
        capture_exception(e)
        return redirect("/result")


@api_view(["GET"])
def result(request):
    p = request.query_params.get("page", "")
    file_data = (
        FileTable.objects.filter(user=request.user)
        .order_by("-id")
        .values("id", "file", "datetime", "status")
    )
    paginator = Paginator(file_data, 5)
    try:
        if p == "":
            p = "1"
        file_pages = paginator.page(int(p))
    except PageNotAnInteger:
        # If page is not an integer, deliver first page.
        file_pages = paginator.page(1)
    except EmptyPage:
        # If page is out of range (e.g. 9999), deliver last page of results.
        file_pages = paginator.page(paginator.num_pages)
    page_list = list(range(1, paginator.num_pages + 1))
    return render(
        request,
        "result.html",
        {"files": file_pages, "current_page": int(p), "pages": page_list},
    )


@api_view(["POST"])
def get_file(request):
    try:
        file = request.FILES.get("file", "")
        if file == "":
            messages.error(request, "No file uploaded")
            return redirect("/")
        if file.name.endswith(".csv"):
            df = pd.read_csv(file, encoding="ISO-8859-1")
        elif file.name.endswith(".xlsx") or file.name.endswith(".xls"):
            df = pd.read_excel(file, engine="openpyxl")
        col = request.data.get("col", "")
        if col not in df.columns:
            messages.error(request, f"No Column called {col}")
            return redirect("/")
        upload_datetime = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        FileTable.objects.create(
            file=file,
            datetime=upload_datetime,
            user=request.user,
            col_name=col,
            status="pending",
        )
        return redirect("/result")
    except Exception as e:
        logger.error(str(e))
        capture_exception(e)
        messages.error(request, "Something went wrong while uploading try again")
        return redirect("/")
