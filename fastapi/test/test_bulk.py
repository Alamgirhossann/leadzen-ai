import os
from time import sleep

import requests
from loguru import logger

from app.bulk.common import BulkUploadResponse
from app.config import API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL
from test.common import TEST_CONFIG_API_BASE_URL, TEST_CONFIG_API_USER_HEADERS


def test_bulk_csv_upload_linkedin_profile_urls_pass():
    filename = "./test/linkedin_profile_urls.csv"
    files = {
        "file": (
            filename,
            open(filename, "rb"),
            "text/csv",
            {"Expires": "0"},
        )
    }

    response = requests.post(
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv",
        files=files,
        headers={
            "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiY2FjMWNhZTEtMWFmNC00MTEwLWIwYzYtZWJlZjM1NWM5M2I5IiwiYXVkIjpbImZhc3RhcGktdXNlcnM6YXV0aCJdLCJleHAiOjE2Mjk4NDY0NDh9.IzrLBcq2TydPv3Ull_tboR8j7hJ4rui9UfaPGzHdJfU"
        },
    )
    assert response
    assert response.status_code == 200

    json = response.json()
    assert json

    data = BulkUploadResponse(**json)
    assert data

    assert data.input_filename == filename

    timeout_counter = 18

    while timeout_counter > 0:
        if os.path.exists(data.output_filename):
            logger.success(f"found {data.output_filename=}")
            assert True
            break

        logger.warning(f"{data.output_filename=} not found, waiting")

        sleep(API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL)

        timeout_counter = timeout_counter - 1

    if not os.path.exists(data.output_filename):
        logger.error(f"not found {data.output_filename=}")
        assert False


def test_bulk_csv_upload_linkedin_profile_urls_fail_with_invalid_column_name():
    filename = "./test/linkedin_profile_urls_fail.csv"
    files = {
        "file": (
            filename,
            open(filename, "rb"),
            "text/csv",
            {"Expires": "0"},
        )
    }

    response = requests.post(
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv",
        files=files,
        headers=TEST_CONFIG_API_USER_HEADERS,
    )
    logger.debug(f"{response.text=}")
    assert response.status_code == 400


def test_bulk_csv_upload_linkedin_profile_urls_fail_with_non_csv():
    filename = "./test/excel_file.xlsx"
    files = {
        "file": (
            filename,
            open(filename, "rb"),
            "application/vnd.ms-excel",
            {"Expires": "0"},
        )
    }

    response = requests.post(
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv",
        files=files,
        headers=TEST_CONFIG_API_USER_HEADERS,
    )
    logger.debug(f"{response.text=}")
    assert response.status_code == 400


def test_bulk_csv_upload_emails_pass():
    filename = "./test/emails.csv"
    files = {
        "file": (
            filename,
            open(filename, "rb"),
            "text/csv",
            {"Expires": "0"},
        )
    }

    response = requests.post(
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv",
        files=files,
        headers=TEST_CONFIG_API_USER_HEADERS,
    )
    assert response
    assert response.status_code == 200

    json = response.json()
    assert json

    data = BulkUploadResponse(**json)
    assert data

    assert data.input_filename == filename

    timeout_counter = 18

    while timeout_counter > 0:
        if os.path.exists(data.output_filename):
            logger.success(f"found {data.output_filename=}")
            assert True
            break

        logger.warning(f"{data.output_filename=} not found, waiting")

        sleep(API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL)

        timeout_counter = timeout_counter - 1

    if not os.path.exists(data.output_filename):
        logger.error(f"not found {data.output_filename=}")
        assert False
