from loguru import logger
import requests
import json
import time
from random import randint
import os
import pandas as pd
from django.conf import settings
import json
import glob
import traceback
import sys
from typing import Optional
from sentry_sdk import capture_exception
import threading
from threading import Thread, current_thread
from .models import *
import csv
from datetime import datetime


class GetData:
    def __init__(
        self,
        file_url="",
        file_name="",
        file_id=0,
        col_name="url",
        current_file=None,
        current_user=None,
    ):
        self.file_path = file_url
        self.file_name = file_name
        self.file_id = file_id
        self.root = settings.BASE_DIR
        self.col_name = col_name
        self.current_file = current_file
        self.current_user = current_user

    def login(self):
        session = requests.Session()
        headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"
        }
        session.get("https://pipl.com/accounts/login/?next=")
        csrf_token = session.cookies["csrftoken_accounts"]
        login_data = {
            "csrfmiddlewaretoken": csrf_token,
            "email": "malhar@analystt.ai",
            "password": "Challenge123$",
            "next": "/",
            "remember": "on",
        }
        headers["Referer"] = "https://pipl.com"
        session.post(
            "https://pipl.com/accounts/login/?next=", data=login_data, headers=headers
        )
        return session, csrf_token

    # search=["Aadesh Agrwal","Aadhi Kesavan","Aaftab Khan","Srinivasa Varma Manthena"]
    # search="Srinivasa Varma Manthena"
    # search_data={"q":[search],"in":["5"],"sloc":[""],"l":[""]}
    def email_verify(self, email: Optional[str] = None):
        api_url = settings.APP_CONFIG_TRUEMAIL_URL
        api_key = settings.APP_CONFIG_TRUEMAIL_KEY
        status = "Not verified"
        try:
            res = requests.get(
                f"{api_url}single?access_token={api_key}&email={email}", timeout=5
            )
            if res.status_code == 200:
                status = res.json().get("result", "").capitalize()
        except Exception as e:
            logger.error(f"In truemail api {e}")
            capture_exception(e)
            status = "Failed to verify"
        return status

    def exclude_columns(self, data, fields):
        data_ = {}
        data.pop("id")
        for k in data.keys():
            if k in fields:
                data_[k] = data[k]
        return data_

    def write_data(
        self,
        table_data=[],
        model=None,
        user=None,
        file=None,
        field_name="",
        emails_with_status=[],
    ):
        all_fields = [f.name for f in model._meta.fields]
        email_verified = None
        if field_name == "emails":
            emails = [
                email_data["address"]
                for email_data in table_data
                if email_data["address"] != "" or email_data.get("address") is not None
            ]
            # email_verified = verify_emails(emails)
        for table in table_data:
            table_ = self.exclude_columns(table, all_fields)
            if emails_with_status:
                table_["status"] = emails_with_status.get(
                    table_.get("address", ""), "Not verified"
                )
            try:
                check_obj = model.objects.filter(**table_, user=user, file=file)
                if not check_obj.exists():
                    model.objects.create(**table_, user=user, file=file)
            except Exception as e:
                logger.exception(e)
                capture_exception(e)

    def store_data(self, data, current_user, file_obj, emails_with_status):
        try:
            person = data["result"].get("person", "")
            if person != "":
                section = person["fields"]
                required_fields = section.keys()
                for field in required_fields:
                    try:
                        field_list = section.get(field, "")
                        if field_list:
                            if field == "names":
                                self.write_data(
                                    table_data=field_list,
                                    model=NameTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "emails":
                                self.write_data(
                                    table_data=field_list,
                                    model=EmailTable,
                                    user=current_user,
                                    file=file_obj,
                                    field_name=field,
                                    emails_with_status=emails_with_status,
                                )
                            elif field == "phones":
                                self.write_data(
                                    table_data=field_list,
                                    model=PhoneTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "educations":
                                self.write_data(
                                    table_data=field_list,
                                    model=EducationTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "jobs":
                                self.write_data(
                                    table_data=field_list,
                                    model=JobTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "social":
                                self.write_data(
                                    table_data=field_list,
                                    model=UrlTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "relationships":
                                self.write_data(
                                    table_data=field_list,
                                    model=RelationTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "languages":
                                self.write_data(
                                    table_data=field_list,
                                    model=LaguageTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "tags":
                                self.write_data(
                                    table_data=field_list,
                                    model=TagTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "addresses":
                                self.write_data(
                                    table_data=field_list,
                                    model=AddressTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "genders":
                                self.write_data(
                                    table_data=field_list,
                                    model=GenderTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                            elif field == "dobs":
                                self.write_data(
                                    table_data=field_list,
                                    model=DobTable,
                                    user=current_user,
                                    file=file_obj,
                                )
                    except Exception as e:
                        logger.critical(e)
                        capture_exception(e)
        except Exception as e:
            logger.critical(e)
            capture_exception(e)

    def write_csv(self, data, id):
        email_status = []
        for i in range(0, 10):
            email_status.append(f"Email_{i}")
            email_status.append(f"Status_{i}")
        all_keys = [
            self.col_name,
            "usernames",
            "user_ids",
            "licenses",
            "jobs",
            "educations",
            "names",
            "genders",
            "languages",
            "dobs",
            "tags",
            "addresses",
            "relationships",
            "phones",
            "emails",
            "social",
        ] + email_status
        root = settings.BASE_DIR
        download_location = os.path.join(root, "download")
        mode = "w"
        download_file = os.path.join(download_location, "download_" + str(id)) + ".csv"
        if os.path.exists(download_file):
            mode = "a"
        try:
            with open(
                download_file,
                mode,
                encoding="utf-8",
            ) as f:  # Output File Name here
                writer = csv.DictWriter(f, fieldnames=all_keys, lineterminator="\n")
                if mode == "w":
                    writer.writeheader()
                writer.writerow(data)
        except Exception as e:
            logger.error(e)
            capture_exception(e)

    def get_emails_status(self, data):
        emails_dict = {}
        for i in range(10):
            emails_dict = {
                **emails_dict,
                **{data.get(f"Email_{i}"): data.get(f"Status_{i}")},
            }
        return emails_dict

    def extract_from_json(self, json_data):
        try:
            field_dict = {}
            section = json_data["result"]["person"]["fields"]
            required_fields = section.keys()
            for field in required_fields:
                try:
                    if field == "social":
                        field_list = section.get("social")
                        field_data = ",".join(
                            list(map(lambda x: x.get("url"), field_list))
                        )
                        field_dict = {**field_dict, **{field: field_data}}
                    elif field == "emails":
                        field_list = section.get(field)
                        emails_10 = list(
                            map(lambda x: x.get("display", ""), field_list)
                        )[:10]
                        emails_10 = emails_10 + [""] * (10 - len(emails_10))
                        for i, email in enumerate(emails_10):
                            field_dict = {
                                **field_dict,
                                **{f"Email_{i}": email},
                                **{f"Status_{i}": self.email_verify(email)},
                            }
                        field_data = ",".join(
                            list(
                                map(
                                    lambda x: x.get("display"),
                                    field_list,
                                )
                            )
                        )
                        field_dict = {**field_dict, **{field: field_data}}

                    else:
                        field_list = section.get(field)
                        field_data = ",".join(
                            list(map(lambda x: x.get("display"), field_list))
                        )
                        field_dict = {**field_dict, **{field: field_data}}
                except Exception as e:
                    pass
                    capture_exception(e)

            return field_dict
        except Exception as e:
            capture_exception(e)
            return {}

    def rename_cols(self, cols):
        col_map = {}
        for col in cols:
            chk_col = list(filter(lambda x: ord(x) > 128, col))
            if chk_col:
                new_col = "".join(filter(lambda x: ord(x) < 128, col))
                col_map[col] = new_col
        return col_map

    def thread_test(self):
        logger.info("Thread")
        k = 0
        for jsn in os.listdir(
            os.path.join(self.root, "jsons", "jsonfiles")
        ):  # folder name
            # file_name = jsn.split("\\")[-1].split(".")[0]
            print(f"Row: {current_thread()} {k}")
            with open(
                os.path.join(self.root, "jsons", "jsonfiles", jsn), encoding="utf-8"
            ) as f:
                json_data = json.load(f)
            json_dict = self.extract_from_json(json_data)
            emails_status = self.get_emails_status(json_dict)
            self.store_data(
                json_data,
                self.current_user,
                self.current_file,
                emails_status,
            )
            self.write_csv(json_dict, self.file_id)
            time.sleep(5)
            k += 1

    def extract_data(self):
        try:
            if self.file_name.endswith(".csv"):
                df = pd.read_csv(
                    os.path.join(self.root, "upload", self.file_name),
                    encoding="ISO-8859-1",
                )
            elif self.file_name.endswith(".xlsx") or self.file_name.endswith(".xls"):
                df = pd.read_excel(
                    os.path.join(self.root, "upload", self.file_name), engine="openpyxl"
                )

            df = df.fillna("")
            rename = self.rename_cols(df.columns)
            if rename:
                df.rename(columns=rename, inplace=True)
            session, csrf_token = self.login()
            start = time.time()
            for i, row in df.iterrows():
                # headers=generateHeaders()
                logger.info(f"{current_thread().getName()} Row: {i}")
                cnt = 0
                while cnt < 3:
                    headers = {
                        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:87.0) Gecko/20100101 Firefox/87.0"
                    }
                    try:
                        session.get(
                            f"{settings.APP_CONFIG_PIPL_URL}/search/", headers=headers
                        )
                        break
                    except Exception as e:
                        print("reconnecting...")
                        capture_exception(e)
                        session, csrf_token = self.login()
                        cnt += 1
                search_data = {
                    "q": [row[self.col_name]],
                    "in": ["5"],
                    "sloc": [""],
                    "l": [""],
                }
                # search_data={"csrfmiddlewaretoken":[csrf_token],"fn":[row['name']],"mn":[""],"ln":[row['surname']],
                #         "em":[row['email']],"ccode":[""],"phn":[""],
                #         "un":[""],"house":[""],"street":[""],"zip_code":[""],"loc_id":[""],
                #         "loc_str":[row['locality']],"form-field-name":[""],"rel_fn":[""],"rel_mn":[""],
                #         "rel_ln":[""],"school":[""],"degree":[""],"org":[row['company']],"title":[row['headline']],"dob":[""],
                #         "in":["45"],"a_search":["t"]}
                headers["X-REQUESTED-WITH"] = "XMLHttpRequest"
                headers["X-CSRFTOKEN"] = csrf_token
                resp = session.post(
                    f"{settings.APP_CONFIG_PIPL_URL}/search/?q={row[self.col_name]}",
                    json=search_data,
                    headers=headers,
                )
                if resp.status_code == 200:
                    try:
                        json_data = resp.json()
                        json_dict = self.extract_from_json(json_data)
                        json_dict[self.col_name] = row[self.col_name]
                        if json_dict:
                            emails_status = self.get_emails_status(json_dict)
                            self.store_data(
                                json_data,
                                self.current_user,
                                self.current_file,
                                emails_status,
                            )
                            self.write_csv(json_dict, self.file_id)
                    except Exception as e:
                        logger.error(e)
                        capture_exception(e)
                total_time = (time.time() - start) / 60
                if i > 0 and i % 5 == 0:
                    logger.info(
                        f"{current_thread().getName()} Rows: {i}  Total Time: { total_time :.3f} min"
                    )
                sleep_time = randint(15, 40)

                logger.info(
                    f"{current_thread().getName()} waiting for {sleep_time/60 :.3f} min"
                )
                time.sleep(sleep_time)
            csrf_data = {"csrfmiddlewaretoken": csrf_token}
            headers.pop("X-REQUESTED-WITH")
            session.post(
                f"{settings.APP_CONFIG_PIPL_URL}/logout/?next=/search/",
                data=csrf_data,
                headers=headers,
            )
            FileTable.objects.filter(id=self.file_id, user=self.current_user).update(
                status="done"
            )
            logger.info(
                f"Done  FILE: {current_thread().getName()}  TIME: {datetime.now()}"
            )
        except Exception as error:
            trace_back = sys.exc_info()[2]
            line = trace_back.tb_lineno
            # error_response={"status":0,"api_status":traceback.format_exc(),"error_line":line,"error_message":str(error),"message": str(error)}
            logger.critical(
                f"{current_thread().getName()} error line: {line} message:{error} status: {traceback.format_exc()} "
            )
            capture_exception(error)
            FileTable.objects.filter(id=self.file_id, user=self.current_user).update(
                status="failed"
            )
            logger.info(
                f" Failed  FILE: {current_thread().getName()}  TIME: {datetime.now()}"
            )
