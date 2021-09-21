import os
from time import sleep
import requests
from loguru import logger
from app.realtimerequestmanual.realtime import RealTimeUploadResponse
from app.config import API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL
from test.common import TEST_CONFIG_API_BASE_URL, TEST_CONFIG_REALTIME_HEADERS,TEST_CONFIG_REALTIME_USER_ID


def test_realtime_excel_upload_pass():
    filename = "./excel_file.xlsx"
    files = {
        "file": (
            filename,
            open(filename, "rb"),
            "application/vnd.ms-excel",
            {"Expires": "0"},
        )

    }
    response = requests.post(
        f"{TEST_CONFIG_API_BASE_URL}/api/realtime_upload/excel",
        files=files,
        data={"user_id": TEST_CONFIG_REALTIME_USER_ID, "requirement": "this is from test"},
        headers=TEST_CONFIG_REALTIME_HEADERS,
    )
    assert response
    assert response.status_code == 200


def test_realtime_csv_upload_fail():
    filename = "./emails.csv"
    files = {
        "file": (
            filename,
            open(filename, "rb"),
            "text/csv",
            {"Expires": "0"},
        )

    }
    response = requests.post(
        f"{TEST_CONFIG_API_BASE_URL}/api/realtime_upload/excel",
        files=files,
        data={"user_id": TEST_CONFIG_REALTIME_USER_ID, "requirement": "this is from test"},
        headers=TEST_CONFIG_REALTIME_HEADERS,
    )
    assert response
    assert response.status_code == 200
