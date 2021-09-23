from typing import Optional, List, Dict
from urllib.parse import urlencode
from fastapi import HTTPException
from starlette import status

from loguru import logger
from pydantic import BaseModel

from app.config import API_CONFIG_PIPL_BASE_URL, API_CONFIG_PIPL_API_KEY, API_CONFIG_EXCEL_FILE_PATH
from app.pipl.common import write_to_file, search_all
from datetime import date
import openpyxl
from openpyxl import load_workbook
from openpyxl.styles import PatternFill

from app.profile_search import get_profile_search
from app.users import get_user
from app.users import User

class PiplDetailsFromProfileUrlRequest(BaseModel):
    profile_urls: List[str]
    filename: Optional[str] = None
    hash_key_list: Optional[List[Dict]] = None
    user: User


class PiplDetailsFromProfileUrlResponse(BaseModel):
    filename: str

async def execute_task(request: PiplDetailsFromProfileUrlRequest):
    profile_urls = list(set(request.profile_urls))  # remove duplicates
    profile_urls = [x for x in profile_urls if x]  # remove empty profile_urls

    urls = [
        f"{API_CONFIG_PIPL_BASE_URL}/?{urlencode({'url': profile_url, 'key': API_CONFIG_PIPL_API_KEY, 'match_requirements': 'phones'})}"
        for profile_url in profile_urls
        if profile_url
    ]

    if not (responses := await search_all(urls=urls, slugs=profile_urls, hash_key_list=request.hash_key_list, user= request.user)):
        logger.error("Error Getting Data")
        return
    if not any(responses):
        logger.error("no valid responses found")
        return

    await write_to_file(responses=responses, filename=request.filename)


def add_excel_template_to_file(outgoing_filename, user):
    if  (outgoing_filename==""):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str("Excel file not found"),
        )
    else:
        wb_orginal = load_workbook(f'{outgoing_filename}')
        if (wb_orginal==""):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("Error in Work book Loading"),
            )
        else:
            try:
                wb_templet=load_workbook(f'{API_CONFIG_EXCEL_FILE_PATH}/LeadZen_template.xlsx')
                index_sheet = wb_templet.get_sheet_by_name('Index')
                data = wb_orginal.get_sheet_by_name('Sheet1')
                financial_advisor = wb_templet.get_sheet_by_name('Financial Advisor')
                number_of_rows = data.max_row
                number_of_col = data.max_column
                for i in range(1, number_of_rows + 1):
                    for j in range(1, number_of_col + 1):
                        c = data.cell(row=i, column=j)
                        financial_advisor.cell(row=i+5, column=j).value = c.value
                for rows in financial_advisor.iter_rows(min_row=6, max_row=6, min_col=1):
                    for cell in rows:
                        cell.fill = PatternFill(fgColor="B4C9D9", patternType="solid")
                no_of_record=index_sheet['J18']
                requested_by = index_sheet['J20']
                request_date = index_sheet['J22']
                no_of_record.value=number_of_rows-1
                requested_by.value=user.username
                today = date.today()
                request_date.value=today.strftime("%d/%m/%Y")
                wb_templet.save(outgoing_filename)
                return outgoing_filename
            except Exception as e:
                logger.critical("Error>>>" + str(e))