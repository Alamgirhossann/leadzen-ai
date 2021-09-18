from typing import Optional, List, Dict
from urllib.parse import urlencode
from fastapi import HTTPException
from starlette import status

from loguru import logger
from pydantic import BaseModel

from app.config import API_CONFIG_PIPL_BASE_URL, API_CONFIG_PIPL_API_KEY, API_CONFIG_EXCEL_FILE_PATH
from app.pipl.common import write_to_file, search_all

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
    print("execute_task Request>>>>>>>", request)

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


def add_excel_template_to_file(outgoing_filename):
    if (outgoing_filename == ""):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=str("Excel file not found"),
        )
    else:
        wb = load_workbook(f'{outgoing_filename}')
        if (wb == ""):
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=str("Error in Work book Loading"),
            )
        else:
            try:
                wb.create_sheet('Index', 0)
                index_sheet = wb.get_sheet_by_name('Index')
                index_sheet.merge_cells('A1:W36')
                img1 = openpyxl.drawing.image.Image(f'{API_CONFIG_EXCEL_FILE_PATH}/Index.png')
                img1.anchor = 'A1'
                index_sheet.add_image(img1)
                wb.create_sheet('Disclaimer', 2)
                dis_sheet = wb.get_sheet_by_name('Disclaimer')
                dis_sheet.merge_cells('A1:X31')
                img2 = openpyxl.drawing.image.Image(f'{API_CONFIG_EXCEL_FILE_PATH}/Disclaimer.png')
                img2.anchor = 'A1'
                dis_sheet.add_image(img2)
                financial_advisor = wb.get_sheet_by_name('Sheet1')
                financial_advisor.title = "Financial Advisor"
                for rows in financial_advisor.iter_rows(min_row=1, max_row=1, min_col=1):
                    for cell in rows:
                        cell.fill = PatternFill(fgColor="B4C9D9", patternType="solid")
                # number_of_rows = financial_advisor.max_row
                number_of_col = financial_advisor.max_column
                last_column = chr(65 + number_of_col - 1)
                lastcell = last_column + str(number_of_col)
                financial_advisor.move_range(f"A1:{lastcell}", rows=8, cols=0)
                financial_advisor.merge_cells('A1:W8')
                img3 = openpyxl.drawing.image.Image(f'{API_CONFIG_EXCEL_FILE_PATH}/FA_img.png')
                img3.anchor = 'A1'
                financial_advisor.add_image(img3)
                wb.save(outgoing_filename)
                return outgoing_filename
            except Exception as e:
                logger.critical("Error>>>" + str(e))
