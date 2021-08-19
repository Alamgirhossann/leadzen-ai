import os

API_CONFIG_PIPL_API_KEY = os.getenv("PIPL_API_ACCESS_KEY", "x8tent752npf5q26l7w9fv95")
API_CONFIG_SELENIUM_SERVER_URL = os.getenv(
    "APP_CONFIG_SELENIUM_SERVER_URL", "http://localhost:4445/wd/hub"
)

API_CONFIG_TEXAU_PROXY_HOST = os.getenv("PROXY_HOST", "http://168.81.41.43:47192")
API_CONFIG_TEXAU_PROXY_PORT = os.getenv("PROXY_PORT", "47192")
API_CONFIG_TEXAU_PROXY_USER = os.getenv("PROXY_USER", "malharlakdawala")
API_CONFIG_TEXAU_PROXY_PASS = os.getenv("PROXY_PASS", "AsHhgbZE")

API_CONFIG_LINKEDIN_CSV_FILE = os.getenv("CSV_FILE", "linkedin_cookies.csv")
API_CONFIG_LINKEDIN_USERNAME = os.getenv("LINKEDIN_USERNAME", "kaylaklug2021@gmail.com")
API_CONFIG_LINKEDIN_PASSWORD = os.getenv("LINKEDIN_PASSWORD", "Q5$&%bD7d$&4*%^bs^3j")
API_CONFIG_LINKEDIN_LOGIN_URL = os.getenv(
    "LINKEDIN_LOGIN_URL",
    "https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin",
)
API_CONFIG_LINKEDIN_SEARCH_BASE_URL = os.getenv(
    "API_CONFIG_LINKEDIN_SEARCH_BASE_URL",
    "https://www.linkedin.com/search/results/people/?",
)
API_CONFIG_LINKEDIN_INDUSTRY_CODES_FILE = os.getenv(
    "API_CONFIG_LINKEDIN_INDUSTRY_CODES_FILE",
    "./app/industry_codes.json",
)

API_CONFIG_LINKEDIN_LOCATION_CODES_FILE = os.getenv(
    "API_CONFIG_LINKEDIN_LOCATION_CODES_FILE",
    "./app/location_codes.json",
)

API_CONFIG_LINKEDIN_COMPANY_CODES_FILE = os.getenv(
    "API_CONFIG_LINKEDIN_COMPANY_CODES_FILE",
    "./app/company_codes.json",
)

API_CONFIG_TEXAU_URL = os.getenv("TEXAU_URL", "https://prod-api.texau.com/api/invoke")
API_CONFIG_TEXAU_KEY = os.getenv(
    "TEXAU_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6ImRmYzE4YTg3LTYxNDItNGQ3Ny1hODMyLWRhOWY4NWI5YzIyOSIsImVtYWlsIjoibWFsaGFybGFrZGF3YWxhQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjIwMjc5ODZ9.3IxFCMgqZdVom8GIBY57WKYjdNRMhSftN_uwfR6cYX8",
)
API_CONFIG_TEXAU_EXECUTION_URL = os.getenv(
    "TEXAU_EXECUTION_URL", "https://prod-api.texau.com/api/spices/executions/"
)
API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID", "5d403c1ddf129e430077c329"
)
API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID",
    "texau-automation-1-dev-linkedInSearchExtractor",
)
API_CONFIG_TEXAU_PROXY_NAME = os.getenv(
    "API_CONFIG_TEXAU_PROXY", "BestProxyAndVPN-Pune"
)
API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL = float(
    os.getenv("API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL", "5.0")
)
API_CONFIG_TRUEMAIL_API_KEY = os.getenv(
    "TRUEMAIL_API_ACCESS_KEY",
    "QRnroC9kz3oftU9TN5SAtjnF8wKMWBBphc4RKpBcFHNTXjOFgDijHE3lcvhBFRUn",
)
API_CONFIG_TRUEMAIL_API_URL = os.getenv(
    "TRUEMAIL_API_ACCESS_URL",
    "https://truemail.io/api/v1/verify/single?address_info=1&timeout=100&access_token=",
)

API_CONFIG_BULK_INCOMING_DIRECTORY = "./bulk/incoming"
API_CONFIG_BULK_OUTGOING_DIRECTORY = "./bulk/outgoing"

API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_RECIPE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_RECIPE_ID", "5e4d2381f0a6f62ab94d8207"
)
API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID",
    "texau-automation-scripts-3-dev-findEmailUsingLinkedin",
)
API_CONFIG_ALLOWED_CONTENT_TYPES = [
    x.strip()
    for x in os.getenv(
        "API_CONFIG_ALLOWED_CONTENT_TYPES", "text/csv, application/vnd.ms-excel"
    ).split(",")
    if x
]
API_CONFIG_ALLOWED_FILE_TYPE = os.getenv("API_CONFIG_ALLOWED_FILE_TYPE", ".csv")
