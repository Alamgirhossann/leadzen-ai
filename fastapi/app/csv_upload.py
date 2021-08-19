from fastapi import Request
from fastapi import APIRouter
from loguru import logger
import os
import re
import csv

router = APIRouter(prefix="/bulksearch", tags=["Bulk Search"])


def check_csv(file):
    # size
    stats = os.stat(file)
    size = stats.st_size
    if size > 2000000:
        return False, 'File size must be less than 2Mb'

    # no. of lines
    has_header = False
    try:
        with open(file, 'r') as userFile:
            lines = userFile.readlines()
            lines = [line for line in lines if line.split()]
            if len(lines) > 50:
                return False, 'File can have maximum of 50 lines'

            delimiters_list = [',', '\t', ';', ':', '|']
            delimiter = ''

            for i, line in enumerate(lines):
                # will avoid blank lines
                # and break after checking first non blank line
                if line and (
                        re.search('name', line, re.IGNORECASE) or
                        re.search('phone', line, re.IGNORECASE) or
                        re.search('email', line, re.IGNORECASE) or
                        re.search('url', line, re.IGNORECASE)
                ):
                    has_header = True
                    break
            if not has_header:
                return False, 'Please add headers to your csv.'

            # avoid blank lines and pick top 5
            top_5 = lines[:5]
            for d in delimiters_list:
                column_track = []
                for line in top_5:
                    column_track.append(len(line.split(d)))

                # can match column_track[0] with no. of fields in csv
                if len(set(column_track)) == 1 and column_track[0] > 1:
                    delimiter = d
                    break

            if delimiter == '':
                return False, 'Unknown delimiters used.'
    except Exception as e:
        logger.critical("Exception >>" + str(e))

    records = []
    try:
        with open(file, 'r') as userFile:
            reader = csv.DictReader(userFile, delimiter=delimiter)
            pattern_phone = re.compile(r'\d{10,12}')
            pattern_url = re.compile(r'linkedin.com\/')
            pattern_email = re.compile(r'^([\w\-\.]+)@([\w\-\.]+)\.([a-zA-Z]{2,5})$')

            for row in reader:
                if row.get('phone', None) and re.search(pattern_phone, row['phone']) and (
                        row.get('email', '') == '' or row.get('email', None) is None or (
                        row.get('email', None) and re.search(pattern_email, row['email']))
                ) and (
                        row.get('url', '') == '' or row.get('url', None) is None or (
                        row.get('url', None) and re.search(pattern_url, row['url']))
                ):
                    records.append(row)

                elif row.get('email', None) and re.search(pattern_email, row['email']) and (
                        row.get('phone', '') == '' or row.get('phone', None) is None or (
                        row.get('phone', None) and re.search(pattern_email, row['phone']))
                ) and (
                        row.get('url', '') == '' or row.get('url', None) is None or (
                        row.get('url', None) and re.search(pattern_url, row['url']))
                ):
                    records.append(row)

                elif row.get('url', None) and re.search(pattern_url, row['url']) and (
                        row.get('phone', '') == '' or row.get('phone', None) is None or (
                        row.get('phone', None) and re.search(pattern_email, row['phone']))
                ) and (
                        row.get('email', '') == '' or row.get('email', None) is None or (
                        row.get('email', None) and re.search(pattern_url, row['email']))
                ):
                    records.append(row)
                else:
                    logger.warning("Invalid entry.", row)
    except Exception as e:
        logger.critical("Exception >>" + str(e))
    return True, records


@router.post("/csvupload")
async def bulk_search(request: Request):
    form = await request.form()
    uploaded_file = form.get("csv-input", None)
    if uploaded_file is None:
        return {"valid": False}
    check_result = []
    try:
        with open(f'app/media/{uploaded_file.filename}', 'wb') as file:
            lines = uploaded_file.file.readlines()
            file.writelines(lines)
        check_result = check_csv(file.name)
    except Exception as e:
        logger.critical("Exception >>" + str(e))

    # return {"filename": uploaded_file.filename}
    records = []
    if check_result[0]:
        records = check_result[1]
    else:
        logger.warning(check_result[1])
    return {"valid": check_result[0]}
    # perform bulk search on records here
    # for record in records:
    #     print(record)
