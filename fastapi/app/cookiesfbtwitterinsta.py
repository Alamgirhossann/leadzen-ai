from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from selenium.webdriver.support.wait import WebDriverWait
import time

path = "/home/kishan/Downloads/webdriver/chromedriver"

fb_cookies = {}


def fb_cookie():
    driver = webdriver.Chrome(path)
    driver.get("https://www.facebook.com/")
    element = driver.find_element_by_name("email")
    element.send_keys("kaylaklug2021@gmail.com")
    element = driver.find_element_by_name("pass")
    element.send_keys("Challenge123$")
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
    driver = webdriver.Chrome(path)
    driver.get("https://twitter.com/login")
    element = driver.find_element_by_name("session[username_or_email]")
    element.send_keys("kaylaklug2021@gmail.com")
    element = driver.find_element_by_name("session[password]")
    element.send_keys("Challenge$123")
    button = driver.find_element_by_xpath(
        '//*[@id="react-root"]/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div')
    button.click()
    driver.implicitly_wait(10)
    try:
        element = driver.find_element_by_name("session[username_or_email]")
        element.send_keys("@KaylaKlug1")
        element = driver.find_element_by_name("session[password]")
        element.send_keys("Challenge$123")
        button = driver.find_element_by_xpath(
            '//*[@id="react-root"]/div/div/div[2]/main/div/div/div[2]/form/div/div[3]/div/div')
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
    driver = webdriver.Chrome(path)
    driver.get("https://www.instagram.com/")
    username = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='username']")))
    password = WebDriverWait(driver, 10).until(EC.element_to_be_clickable((By.CSS_SELECTOR, "input[name='password']")))
    username.clear()
    username.send_keys("kaylaklug2021@gmail.com")
    password.clear()
    password.send_keys("Challenge123$")
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
    print(insta_cookies)
    driver.quit()


twitter_cookie()
# insta_cookie()
# fb_cookie()