from selenium import webdriver
from time import sleep
# import requests

browser = webdriver.Chrome(executable_path='../../chromedriver.exe')
with open('../../config.txt') as file:
    line = file.read().splitlines()
    username = line[0]
    password = line[1]

# Open login page
browser.get('https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin')

# #Enter login info:
elementID = browser.find_element_by_id('username')
elementID.send_keys(username)

elementID = browser.find_element_by_id('password')
elementID.send_keys(password)

# #Note: replace the keys "username" and "password" with your LinkedIn login info
elementID.submit()
sleep(3)

cookie_list = browser.get_cookies()
for cookie_dict in cookie_list:
    if cookie_dict['name']=='li_at':
        print('\n\nli_at:')
        print(cookie_dict['value'])
browser.close()
