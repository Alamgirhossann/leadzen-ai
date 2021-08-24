import os
from time import sleep

import requests
from loguru import logger

from app.bulk_upload import BulkUploadResponse
from app.config import API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL
from test.common import TEST_CONFIG_API_BASE_URL


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
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv", files=files
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

        sleep(API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL)

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
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv", files=files
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
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv", files=files
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
        f"{TEST_CONFIG_API_BASE_URL}/api/bulk_upload/csv", files=files
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

        sleep(API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL)

        timeout_counter = timeout_counter - 1

    if not os.path.exists(data.output_filename):
        logger.error(f"not found {data.output_filename=}")
        assert False
