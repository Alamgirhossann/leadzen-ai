import csv
from typing import Optional

from loguru import logger

from app.config import API_CONFIG_LINKEDIN_CSV_FILE


def read_linkedin_cookie() -> Optional[str]:
    cookie = None

    with open(f"./{API_CONFIG_LINKEDIN_CSV_FILE}", "r") as file:
        csv_reader = csv.reader(file)
        for line in csv_reader:
            if csv_reader.line_num == 2:
                cookie = line[0]
                logger.debug(cookie, "cookie")

    return cookie
