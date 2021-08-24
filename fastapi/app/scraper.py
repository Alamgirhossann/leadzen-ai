import time
import zipfile

from loguru import logger
from selenium import webdriver
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
from app.config import (
    API_CONFIG_SELENIUM_SERVER_URL,
    API_CONFIG_TEXAU_PROXY_USER,
    API_CONFIG_TEXAU_PROXY_PASS,
    API_CONFIG_TEXAU_PROXY_PORT,
    API_CONFIG_TEXAU_PROXY_HOST,
    API_CONFIG_LINKEDIN_USERNAME,
    API_CONFIG_LINKEDIN_PASSWORD,
    API_CONFIG_LINKEDIN_LOGIN_URL,
    API_CONFIG_FACEBOOK_LOGIN_URL,
    API_CONFIG_TWITTER_LOGIN_URL,
    API_CONFIG_INSTA_LOGIN_URL,
    API_CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME,
    API_CONFIG_FACEBOOK_LOGIN_PASSWORD,
    API_CONFIG_TWITTER_LOGIN_PASSWORD,
    API_CONFIG_INSTA_LOGIN_PASSWORD
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
        logger.debug("cookie_list" + str(cookie_list))
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


# kishan

fb_cookies = {}


def fb_cookie():
    driver = get_chromedriver(use_proxy=True)
    driver.get(API_CONFIG_FACEBOOK_LOGIN_URL)
    element = driver.find_element_by_name("email")
    element.send_keys(API_CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME)
    element = driver.find_element_by_name("pass")
    element.send_keys(API_CONFIG_FACEBOOK_LOGIN_PASSWORD)
    button = driver.find_element_by_name("login")
    button.click()
    driver.implicitly_wait(150)
    driver.current_url
    cookies = driver.get_cookies()

    for i in cookies:
        check = False
        for j in i:
            if (i[j] == "xs" or i[j] == "c_user"):
                check = True
                v = i[j]
            if (check and j == "value"):
                fb_cookies[v] = i[j]

    print(fb_cookie)

    time.sleep(10)

    driver.quit()


twitter_cookies = {}


def twitter_cookie():
    driver = get_chromedriver(use_proxy=True)
    driver.get(API_CONFIG_TWITTER_LOGIN_URL)
    element = driver.find_element_by_name("session[username_or_email]")
    element.send_keys(API_CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME)
    element = driver.find_element_by_name("session[password]")
    element.send_keys(API_CONFIG_TWITTER_LOGIN_PASSWORD)
    button = driver.find_element_by_xpath('//*[@id="react-root"]/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div')
    button.click()
    driver.implicitly_wait(10)
    try:
        element = driver.find_element_by_name("session[username_or_email]")
        element.send_keys(API_CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME)
        element = driver.find_element_by_name("session[password]")
        element.send_keys(API_CONFIG_TWITTER_LOGIN_PASSWORD)
        button = driver.find_element_by_xpath('//*[@id="react-root"]/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div')
        button.click()
    except:
        pass

    driver.implicitly_wait(100)
    driver.current_url
    cookies = driver.get_cookies()

    for i in cookies:
        check = False
        for j in i:
            if (i[j] == "auth_token"):
                check = True
                v = i[j]
            if (check and j == "value"):
                twitter_cookies[v] = i[j]

    print(twitter_cookies)

    time.sleep(100)
    driver.quit()


insta_cookies = {}


def insta_cookie():
    driver = get_chromedriver(use_proxy=True)
    driver.get(API_CONFIG_INSTA_LOGIN_URL)
    username = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='username']")))
    password = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='password']")))
    username.clear()
    username.send_keys(API_CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME)
    password.clear()
    password.send_keys(API_CONFIG_INSTA_LOGIN_PASSWORD)
    Login_button = WebDriverWait(driver, 2).until(
        EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()
    alert = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.XPATH, '//button[contains(text(), "Not Now")]'))).click()
    cookies = driver.get_cookies()

    for i in cookies:
        check = False
        for j in i:
            if (i[j] == "sessionid"):
                check = True
                v = i[j]
            if (check and j == "value"):
                insta_cookies[v] = i[j]
    time.sleep(10)
    print("insta",insta_cookies)
    driver.quit()


