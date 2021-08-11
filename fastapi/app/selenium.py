import os
import sys
import time
import zipfile

from loguru import logger

from app.config import SELENIUM_SERVER_URL, PROXY_USER, PROXY_PASS, PROXY_PORT, PROXY_HOST, LINKEDIN_USERNAME, \
    LINKEDIN_PASSWORD, LINKEDIN_LOGIN_URL
from selenium import webdriver

manifest_json = """
{
    "version": "1.0.0",
    "manifest_version": 2,
    "name": "Chrome Proxy",
    "permissions": [
        "proxy",
        "tabs",
        "unlimitedStorage",
        "storage",
        "<all_urls>",
        "webRequest",
        "webRequestBlocking"
    ],
    "background": {
        "scripts": ["background.js"]
    },
    "minimum_chrome_version":"22.0.0"
}
"""

background_js = """
var config = {
        mode: "fixed_servers",
        rules: {
          singleProxy: {
            scheme: "http",
            host: "%s",
            port: parseInt(%s)
          },
          bypassList: ["localhost"]
        }
      };

chrome.proxy.settings.set({value: config, scope: "regular"}, function() {});

function callbackFn(details) {
    return {
        authCredentials: {
            username: "%s",
            password: "%s"
        }
    };
}

chrome.webRequest.onAuthRequired.addListener(
            callbackFn,
            {urls: ["<all_urls>"]},
            ['blocking']
);
""" % (PROXY_HOST, PROXY_PORT, PROXY_USER, PROXY_PASS)


def get_chromedriver(use_proxy=False):
    chrome_options = webdriver.ChromeOptions()
    if use_proxy:
        pluginfile = 'proxy_auth_plugin.zip'

        with zipfile.ZipFile(pluginfile, 'w') as zp:
            zp.writestr("manifest.json", manifest_json)
            zp.writestr("background.js", background_js)
        chrome_options.add_extension(pluginfile)
        capabilities = chrome_options.to_capabilities()
    driver = webdriver.Remote(
        command_executor=SELENIUM_SERVER_URL,
        desired_capabilities=capabilities)
    print("driver", driver)
    return driver


def fetch_linkedin_cookie():
    try:
        browser = get_chromedriver(use_proxy=True)
        # Open login page
        browser.get(LINKEDIN_LOGIN_URL)
        # #Enter login info:
        print("browser", browser)
        elementID = browser.find_element_by_id('username')
        elementID.send_keys(LINKEDIN_USERNAME)

        elementID = browser.find_element_by_id('password')
        elementID.send_keys(LINKEDIN_PASSWORD)

        elementID.submit()
        time.sleep(3)
        cookie_list = browser.get_cookies()
        print("cookie_list", cookie_list)
        cookie = ''
        for cookie_dict in cookie_list:
            if cookie_dict['name'] == 'li_at':
                print('\n\nli_at:')
                print(cookie_dict['value'])
                cookie = cookie_dict['value']
        return cookie
    except Exception as e:
        logger.critical(str(e))
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        print("Error on line {}".format(sys.exc_info()[-1].tb_lineno))
