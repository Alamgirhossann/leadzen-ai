import os

API_CONFIG_PIPL_API_KEY = os.getenv("PIPL_API_ACCESS_KEY", "x8tent752npf5q26l7w9fv95")
SELENIUM_SERVER_URL = os.getenv("APP_CONFIG_SELENIUM_SERVER_URL", "http://localhost:4445/wd/hub")
PROXY_HOST = os.getenv('PROXY_HOST', '168.81.41.43')
PROXY_PORT = os.getenv('PROXY_PORT', '47192')
PROXY_USER = os.getenv('PROXY_USER', 'malharlakdawala')
PROXY_PASS = os.getenv('PROXY_PASS', 'AsHhgbZE')
CSV_FILE = os.getenv('CSV_FILE', 'linkedin_cookies.csv')
LINKEDIN_USERNAME = os.getenv('LINKEDIN_USERNAME', 'kaylaklug2021@gmail.com')
LINKEDIN_PASSWORD = os.getenv('LINKEDIN_PASSWORD', 'Q5$&%bD7d$&4*%^bs^3j')
LINKEDIN_LOGIN_URL = os.getenv('LINKEDIN_LOGIN_URL',
                               'https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin')
TEXAU_URL = os.getenv('TEXAU_URL', 'https://prod-api.texau.com/api/invoke')
TEXAU_KEY = os.getenv('TEXAU_KEY',
                      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6ImRmYzE4YTg3LTYxNDItNGQ3Ny1hODMyLWRhOWY4NWI5YzIyOSIsImVtYWlsIjoibWFsaGFybGFrZGF3YWxhQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjIwMjc5ODZ9.3IxFCMgqZdVom8GIBY57WKYjdNRMhSftN_uwfR6cYX8')
TEXAU_EXECUTION_URL = os.getenv('TEXAU_EXECUTION_URL', 'https://prod-api.texau.com/api/spices/executions/')
