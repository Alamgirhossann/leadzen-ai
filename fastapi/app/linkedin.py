import json
import urllib.parse

from loguru import logger

from app.config import (
    API_CONFIG_LINKEDIN_SEARCH_BASE_URL,
    API_CONFIG_LINKEDIN_INDUSTRY_CODES_FILE,
    API_CONFIG_LINKEDIN_COMPANY_CODES_FILE,
    API_CONFIG_LINKEDIN_LOCATION_CODES_FILE,
    API_CONFIG_LINKEDIN_COMPANY_SEARCH_BASE_URL, API_CONFIG_LINKEDIN_COMPANY_SIZE_CODES_FILE
)

linkedin_baseurl = API_CONFIG_LINKEDIN_SEARCH_BASE_URL
linkedin_baseurl_company = API_CONFIG_LINKEDIN_COMPANY_SEARCH_BASE_URL

key_value_pairs = dict()
try:
    with open(API_CONFIG_LINKEDIN_INDUSTRY_CODES_FILE) as json_file:
        industry_codes = json.load(json_file)
except Exception as e:
    industry_codes = {}
    logger.critical(str(e))

try:
    with open(API_CONFIG_LINKEDIN_LOCATION_CODES_FILE) as json_file:
        location_codes = json.load(json_file)
except Exception as e:
    location_codes = {}
    logger.critical(str(e))

try:
    with open(API_CONFIG_LINKEDIN_COMPANY_CODES_FILE) as json_file:
        company_codes = json.load(json_file)
except Exception as e:
    company_codes = {}
    logger.critical(str(e))


def set_list_values(link, k, v, link_ends_with=""):
    kw = ""
    prefix = "&"
    if link_ends_with == "?":
        prefix = ""
    if k == "industry":
        code_list = []
        for item in v:
            print("item>>>>", item.title())
            code = industry_codes.get(item.title(), None)
            if code:
                code_list.append(code)
            else:
                kw += f" {item}"

        if code_list:
            link += prefix + k + "=" + str(code_list)

    elif k == "geoUrn" or k == "companyHqGeo":
        code_list = []
        for item in v:
            code = location_codes.get(item.title(), None)
            if code:
                code_list.append(code)
            else:
                kw += f" {item}"
        if code_list:
            link += prefix + k + "=" + str(code_list)
    elif k == "currentCompany" or k == "pastCompany":
        code_list = []
        for item in v:
            code = company_codes.get(item.title(), None)
            if code:
                code_list.append(code)
            else:
                kw += f" {item}"
        if code_list:
            link += prefix + k + "=" + str(code_list)
    elif k == "employeeCount":
        code_list = []
        for item in v:
            code_list.append(item)
        if code_list:
            link += prefix + "companySize" + "=" + str(code_list)
    else:
        # no use as of now
        link += prefix + k + "=" + str(v)
    return link.replace("'", '"'), kw


def query_url_builder(search_field_dict):
    try:
        key_value_pairs = search_field_dict
        key_value_pairs["geoUrn"] = key_value_pairs.pop("location")
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
        # print(encoded_link)
        return encoded_link
    except Exception as e:
        logger.critical(str(e))


def query_url_builder_company(search_field_dict):
    try:
        key_value_pairs1 = search_field_dict
        key_value_pairs1["keywords1"] = key_value_pairs1.pop("keywords")
        key_value_pairs1["keywords"] = key_value_pairs1.pop("name")
        key_value_pairs1["companyHqGeo"] = key_value_pairs1.pop("location")
        keyword1_value=key_value_pairs1.get("keywords1", "")
        if keyword1_value=="":
            keyword1_value=None
        # kw = key_value_pairs.get("keywords", "")
        print("key_value_pairs>>>>", key_value_pairs1)

        link = linkedin_baseurl_company

        for k, v in key_value_pairs1.items():
            # if k == 'education':
            #     kw += (f' {v}' if kw else v)
            #     continue
            if v:
                if type(v) is list:
                    if link.endswith("?"):
                        print("In If", k, '\n', v)
                        link, new_kw = set_list_values(link, k, v, "?")
                        # kw += (f'{new_kw}' if kw else new_kw.strip(' '))
                    else:
                        print("In Else", k, '\n', v)
                        if (k=="keywords1"):
                            k="keywords"
                            link, new_kw = set_list_values(link, k, v)
                        else:
                            link, new_kw = set_list_values(link, k, v)
                else:
                    if link.endswith("?"):
                        if keyword1_value is not None:
                            for kw in keyword1_value:
                                link += k + "=" + v
                        else:
                            link += k + "=" + v
                    else:
                        if keyword1_value is not None:
                            for kw in keyword1_value:
                                link += "&" + k + "=" + v +","+kw
                        else:
                            link += "&" + k + "=" + v
        # if kw.strip(' '):
        #     if link.endswith('?'):
        #         link += f'keywords={kw}'
        #     else:
        #         link += '&' + f'keywords={kw}'

        encoded_link = urllib.parse.quote(link, safe="/:?=&")
        print("Encodec Company URL", encoded_link)
        return encoded_link
    except Exception as e:
        logger.critical(str(e))

# query_url_builder_company({"name":"wipro","industry":["Information Technology and Services"],"location":["Pune"],"employee_count":["1-10 employees"]})
# query_url_builder_company({"name":"wipro","industry":[],"location":[],"employee_count":[]})
