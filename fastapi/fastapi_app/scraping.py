#import os, random, sys, time
#from urllib.parse import urlparse
from os import link, name
from selenium import webdriver
# #from bs4 import BeautifulSoup
from time import sleep
import csv
from csv import writer
# from parsel import Selector
# from selenium.common.exceptions import NoSuchElementException

import urllib.parse

industry_codes = {'Accounting': '47', 'Airlines': '94', 'Aviation': '94', 'Alternative Dispute Resolution': '120',
                  'Alternative Medicine': '125', 'Animation': '127', 'Apparel & Fashion': '19',
                  'Architecture & Planning': '50', 'Arts and Crafts': '111', 'Automotive': '53',
                  'Aviation & Aerospace': '52', 'Banking': '41', 'Biotechnology': '12', 'Broadcast Media': '36',
                  'Building Materials': '49', 'Business Supplies and Equipment': '138', 'Capital Markets': '129',
                  'Chemicals': '54', 'Civic & Social Organization': '90', 'Civil Engineering': '51',
                  'Commercial real Estate': '128', 'Computer & Network Security': '118', 'Computer Games': '109',
                  'Computer Hardware': '3', 'Computer Networking': '5', 'Computer Software': '4', 'Construction': '48',
                  'Consumer Electronics': '24', 'Consumer Goods': '25', 'Consumer Services': '91', 'Cosmetics': '18',
                  'Dairy': '65', 'Defense & Space': '1', 'Design': '99', 'Education Management': '69',
                  'E-Learning': '132', 'Electrical/Electronic Manufacturing': '112', 'Entertainment': '28',
                  'Environmental Services': '86', 'Events Services': '110', 'Executive Office': '76',
                  'Facilities Services': '122', 'Farming': '63', 'Financial services': '43', 'Fine Art': '38',
                  'Fishery': '66', 'Food & Beverages': '34', 'Food Production': '23', 'Fund-Raising': '101',
                  'Furniture': '26', 'Gambling & Casinos': '29', 'Glass, Ceramics & Concrete': '145',
                  'Government Administration': '75', 'Government Relations': '148', 'Graphic Design': '140',
                  '	Health, Wellness and Fitness': '124', 'Higher Education': '68', 'Hospital & Health Care': '14',
                  'Hospitality': '14', 'Human Resources': '137', 'Import and Export': '134',
                  '	Individual & Family Services': '88', 'Industrial Automation': '147',
                  'Information Services': '84', 'Information Technology and Services': '96', 'Insurance': '42',
                  '	International Affairs': '74', 'International Trade and Development': '141', 'Internet': '6',
                  'Investment Banking': '45', 'Investment Management': '46', 'Judiciary': '73', 'Law Enforcement': '77',
                  'Law Practice': '9', 'Legal Services': '10', 'Legislative Office': '72',
                  'Leisure, Travel & Tourism': '30', 'Libraries': '85', 'Logistics and Supply Chain': '116',
                  'Luxury Goods & Jewelry': '143', 'Machinery': '55', 'Management Consulting': '11', 'Maritime': '95',
                  'Market Research': '97', 'Marketing and Advertising': '80',
                  'Mechanical or Industrial Engineering': '135', 'Media Production': '126', 'Medical Devices': '17',
                  'Medical Practice': '13', 'Mental Health Care': '139', 'Military': '71', 'Mining & Metals': '56',
                  'Motion Pictures and Film': '35', 'Museums and Institutions': '37', 'Music': '115',
                  'Nanotechnology': '114', 'Newspapers': '81', 'Oil & Energy': '57', 'Online Media': '113',
                  'Outsourcing': '123', 'Offshoring': '123', 'Package': '87', 'Freight Delivery': '87',
                  'Packaging and Containers': '146', 'Paper & Forest Products': '61', 'Performing Arts': '39',
                  'Pharmaceuticals': '15', 'Philanthropy': '131', 'Photography': '136', 'Plastics': '117',
                  'Political Organization': '107', 'Primary/Secondary Education': '67', 'Printing': '83',
                  'Professional Training & Coaching': '105', 'Program Development': '102', 'Public Policy': '79',
                  'Public Relations and Communications': '98', 'Public Safety': '78', 'Publishing': '82',
                  'Railroad Manufacture': '62', 'Newspapers': '100', 'Ranching': '', 'Real Estate': '44',
                  'Recreational Facilities and Services': '40', 'Religious Institutions': '89',
                  'Renewables & Environment': '144', 'Research': '70', 'Restaurants': '32', 'Retail': '27',
                  'Security and Investigations': '121', 'Semiconductors': '7', 'Shipbuilding': '58',
                  'Sporting Goods': '20', 'Sports': '33', 'Staffing and Recruiting': '104', 'Supermarkets': '22',
                  'Telecommunications': '8', 'Textiles': '60', 'Think Tanks': '130', 'Tobacco': '21',
                  'Translation and Localization': '108', 'Transportation/Trucking/Railroad': '92', 'Utilities': '59',
                  'Venture Capital & Private Equity': '106', 'Veterinary': '16', 'Warehousing': '93',
                  'Wholesale': '133', 'Wine and Spirits': '142', 'Wireless': '119', 'Writing and Editing': '103'}
location_codes = {}
company_codes = {}

def set_list_values(link, k, v, link_ends_with=''):
    prefix = "&"
    if link_ends_with == '?':
        prefix = ""
    if k == 'industry':
        code_list = []
        for item in v:
            code = industry_codes.get(item, None)
            if code:
                code_list.append(code)
        if code_list:
            link += prefix + k + '=' + str(code_list)
    elif k == 'location':
        code_list = []
        for item in v:
            code = location_codes.get(item, None)
            if code:
                code_list.append(code)
        if code_list:
            link += prefix + k + '=' + str(code_list)
    elif k == 'currentCompany' or k == "pastCompany":
        code_list = []
        for item in v:
            code = industry_codes.get(item, None)
            if code:
                code_list.append(code)
        if code_list:
            link += prefix + k + '=' + str(code_list)
    else:
        # no use as of now
        link += prefix + k + '=' + str(v)
    return link.replace("'", '"')

linkedin_baseurl = 'https://www.linkedin.com/search/results/people/?'
key_value_pairs = {}

key_value_pairs["firstName"] = input("First Name: ")
key_value_pairs["lastName"] = input("Last Name: ")
key_value_pairs["title"] = input("Title: ").capitalize()
key_value_pairs["keywords"] = input("Keywords: ")
# key_value_pairs["profileLanguage"] = ["en"]

# origin=FACETED_SEARCH
# origin=GLOBAL_SEARCH_HEADER
# origin=SWITCH_SEARCH_VERTICAL

# all below should be as list of strings
# There should be no space in b/w list item and comma
# If there is space use trim
key_value_pairs["industry"] = [item.strip() for item in input("Industry: ").split(',')]
key_value_pairs["location"] = [item.strip() for item in input("Location: ").split(',')]  # geoUrn
key_value_pairs["currentCompany"] = [item.strip() for item in input("Current Company: ").split(',')]
key_value_pairs["pastCompany"] = [item.strip() for item in input("Past Comapany: ").split(',')]

link = ""
kw = key_value_pairs.get("keywords", None)
if kw:
    link = linkedin_baseurl
    for k, v in key_value_pairs.items():
        if v:
            if type(v) is list:
                if link.endswith('?'):
                    # print(k, '\n', v)
                    link = set_list_values(link, k, v, '?')
                else:
                    # print(k, '\n', v)
                    link = set_list_values(link, k, v)
            else:
                if link.endswith('?'):
                    link += k + '=' + v
                else:
                    link += '&' + k + '=' + v
    encoded_link = urllib.parse.quote(link, safe='/:?=&')
    print(encoded_link)
    # link = encoded_link
else:
    pass

