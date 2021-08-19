import time
import zipfile

from loguru import logger
from selenium import webdriver

from app.config import (
    API_CONFIG_SELENIUM_SERVER_URL,
    API_CONFIG_TEXAU_PROXY_USER,
    API_CONFIG_TEXAU_PROXY_PASS,
    API_CONFIG_TEXAU_PROXY_PORT,
    API_CONFIG_TEXAU_PROXY_HOST,
    API_CONFIG_LINKEDIN_USERNAME,
    API_CONFIG_LINKEDIN_PASSWORD,
    API_CONFIG_LINKEDIN_LOGIN_URL,
)

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
""" % (
    API_CONFIG_TEXAU_PROXY_HOST,
    API_CONFIG_TEXAU_PROXY_PORT,
    API_CONFIG_TEXAU_PROXY_USER,
    API_CONFIG_TEXAU_PROXY_PASS,
)


def get_chromedriver(use_proxy=False):
    chrome_options = webdriver.ChromeOptions()

    if use_proxy:
        plugin_file = "proxy_auth_plugin.zip"

        with zipfile.ZipFile(plugin_file, "w") as zp:
            zp.writestr("manifest.json", manifest_json)
            zp.writestr("background.js", background_js)

        chrome_options.add_extension(plugin_file)

    capabilities = chrome_options.to_capabilities()

    driver = webdriver.Remote(
        command_executor=API_CONFIG_SELENIUM_SERVER_URL,
        desired_capabilities=capabilities,
    )

    return driver


def fetch_linkedin_cookie():
    try:
        browser = get_chromedriver(use_proxy=True)
        # Open login page
        browser.get(API_CONFIG_LINKEDIN_LOGIN_URL)
        # #Enter login info:
        print("browser", browser)
        element_id = browser.find_element_by_id("username")
        element_id.send_keys(API_CONFIG_LINKEDIN_USERNAME)

        element_id = browser.find_element_by_id("password")
        element_id.send_keys(API_CONFIG_LINKEDIN_PASSWORD)

        element_id.submit()
        time.sleep(3)
        cookie_list = browser.get_cookies()
        logger.debug("cookie_list", cookie_list)
        cookie = ""
        for cookie_dict in cookie_list:
            if cookie_dict["name"] == "li_at":
                print("\n\nli_at:")
                print(cookie_dict["value"])
                cookie = cookie_dict["value"]
        browser.quit()

        return cookie
    except Exception as e:
        logger.critical(str(e))
        return None
