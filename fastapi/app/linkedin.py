import json
import urllib.parse

from loguru import logger

from app.config import (
    API_CONFIG_LINKEDIN_SEARCH_BASE_URL,
    API_CONFIG_LINKEDIN_INDUSTRY_CODES_FILE,
    API_CONFIG_LINKEDIN_COMPANY_CODES_FILE,
    API_CONFIG_LINKEDIN_LOCATION_CODES_FILE
)

linkedin_baseurl = API_CONFIG_LINKEDIN_SEARCH_BASE_URL

key_value_pairs = dict()
with open(API_CONFIG_LINKEDIN_INDUSTRY_CODES_FILE) as json_file:
    industry_codes = json.load(json_file)

with open(API_CONFIG_LINKEDIN_LOCATION_CODES_FILE) as json_file:
    location_codes = json.load(json_file)

with open(API_CONFIG_LINKEDIN_COMPANY_CODES_FILE) as json_file:
    company_codes = json.load(json_file)


def set_list_values(link, k, v, link_ends_with=""):
    kw = ""
    prefix = "&"
    if link_ends_with == "?":
        prefix = ""
    if k == "industry":
        code_list = []
        for item in v:
            code = industry_codes.get(item, None)
            if code:
                code_list.append(code)
            else:
                kw += f" {item}"
        if code_list:
            link += prefix + k + "=" + str(code_list)
    elif k == "location":
        code_list = []
        for item in v:
            code = location_codes.get(item, None)
            if code:
                code_list.append(code)
            else:
                kw += f" {item}"
        if code_list:
            link += prefix + k + "=" + str(code_list)
    elif k == "currentCompany" or k == "pastCompany":
        code_list = []
        for item in v:
            code = industry_codes.get(item, None)
            if code:
                code_list.append(code)
            else:
                kw += f" {item}"
        if code_list:
            link += prefix + k + "=" + str(code_list)
    else:
        # no use as of now
        link += prefix + k + "=" + str(v)
    return link.replace("'", '"'), kw


def query_url_builder(search_field_dict):
    try:
        key_value_pairs = search_field_dict
        kw = key_value_pairs.get("keywords", "")

        link = linkedin_baseurl
        for k, v in key_value_pairs.items():
            if k == 'education':
                kw += (f' {v}' if kw else v)
                continue
            if v:
                if type(v) is list:
                    if link.endswith("?"):
                        # print(k, '\n', v)
                        link, new_kw = set_list_values(link, k, v, "?")
                        kw += (f'{new_kw}' if kw else new_kw.strip(' '))
                    else:
                        # print(k, '\n', v)
                        link, new_kw = set_list_values(link, k, v)
                        kw += (f'{new_kw}' if kw else new_kw.strip(' '))
                else:
                    if link.endswith("?"):
                        link += k + "=" + v
                    else:
                        link += "&" + k + "=" + v
        if kw.strip(' '):
            if link.endswith('?'):
                link += f'keywords={kw}'
            else:
                link += '&' + f'keywords={kw}'
        encoded_link = urllib.parse.quote(link, safe="/:?=&")
        print(encoded_link)
        return encoded_link
    except Exception as e:
        logger.critical(str(e))
