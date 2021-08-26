import os

API_CONFIG_PIPL_API_KEY = os.getenv("PIPL_API_ACCESS_KEY", "x8tent752npf5q26l7w9fv95")
API_CONFIG_SELENIUM_SERVER_URL = os.getenv(
    "APP_CONFIG_SELENIUM_SERVER_URL", "http://localhost:4445/wd/hub"
)

API_CONFIG_PROXY_HOST = os.getenv("PROXY_HOST", "168.81.41.43")
API_CONFIG_PROXY_PORT = os.getenv("PROXY_PORT", "47192")
API_CONFIG_PROXY_USER = os.getenv("PROXY_USER", "malharlakdawala")
API_CONFIG_PROXY_PASS = os.getenv("PROXY_PASS", "AsHhgbZE")

API_CONFIG_LINKEDIN_CSV_FILE = os.getenv("CSV_FILE", "linkedin_cookies.csv")
API_CONFIG_LINKEDIN_USERNAME = os.getenv("API_CONFIG_LINKEDIN_USERNAME", "tareiljess@yahoo.com")
API_CONFIG_LINKEDIN_PASSWORD = os.getenv("API_CONFIG_LINKEDIN_PASSWORD", "Challenge123$")
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
API_CONFIG_TEXAU_PROXY = os.getenv("API_CONFIG_TEXAU_PROXY", "BestProxyAndVPN-Pune")
API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL = float(
    os.getenv("API_CONFIG_TEXAU_LINKEDIN_TASK_STATUS_CHECK_INTERVAL", "5.0")
)
API_CONFIG_TRUEMAIL_API_KEY = os.getenv("TRUEMAIL_API_ACCESS_KEY", "QRnroC9kz3oftU9TN5SAtjnF8wKMWBBphc4RKpBcFHNTXjOFgDijHE3lcvhBFRUn")
API_CONFIG_TRUEMAIL_API_URL = os.getenv("TRUEMAIL_API_ACCESS_URL", 'https://truemail.io/api/v1/verify/single?address_info=1&timeout=100&access_token=')
API_CONFIG_SNOV_GRANT_TYPE = os.getenv("API_CONFIG_SNOV_GRANT_TYPE", 'client_credentials')
API_CONFIG_SNOV_CLIENT_ID = os.getenv("API_CONFIG_SNOV_CLIENT_ID", 'ca0da7ac0d5bb551ee2963f5c9805c57')
API_CONFIG_SNOV_CLIENT_SECRET = os.getenv("API_CONFIG_SNOV_CLIENT_SECRET", 'c2d048ef0203d52e67eeea8c8d6bd6e0')
API_CONFIG_SNOV_OAUTH_ACESS_TOKEN = os.getenv("API_CONFIG_SNOV_OAUTH_ACESS_TOKEN", 'https://api.snov.io/v1/oauth/access_token')
API_CONFIG_SNOV_ADD_URL_SEARCH = os.getenv("API_CONFIG_SNOV_ADD_URL_SEARCH",'https://api.snov.io/v1/add-url-for-search')
API_CONFIG_SNOV_GET_EMAIL = os.getenv("API_CONFIG_SNOV_GET_EMAIL",'https://api.snov.io/v1/get-emails-from-url')
API_CONFIG_TRUEMAIL_API_URL= os.getenv("API_CONFIG_TRUEMAIL_API_URL",'http://127.0.0.1:12005/api/verification_email/truemail/')

API_CONFIG_SELF_URL = os.getenv("API_CONFIG_SELF_URL", 'http://localhost:8000/api/refresh_linkedin_cookie')
API_CONFIG_PROXY_URL = os.getenv("API_CONFIG_PROXY_URL", 'http://168.81.41.43:47192')
API_CONFIG_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./people.db")

API_CONFIG_FACEBOOK_LOGIN_URL = os.getenv("API_CONFIG_FACEBOOK_LOGIN_URL","https://www.facebook.com/")
API_CONFIG_TWITTER_LOGIN_URL = os.getenv("API_CONFIG_TWITTER_LOGIN_URL","https://twitter.com/login")
API_CONFIG_INSTA_LOGIN_URL = os.getenv("API_CONFIG_INSTA_LOGIN_URL","https://www.instagram.com/")
API_CONFIG_FACEBOOK_LOGIN_PASSWORD = os.getenv("API_CONFIG_FACEBOOK_LOGIN_PASSWORD","Challenge123$")
API_CONFIG_INSTA_LOGIN_PASSWORD = os.getenv("API_CONFIG_INSTA_LOGIN_PASSWORD","Challenge123$")
API_CONFIG_TWITTER_LOGIN_PASSWORD = os.getenv("API_CONFIG_TWITTER_LOGIN_PASSWORD","Challenge$123")
API_CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME = os.getenv("CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME","kaylaklug2021@gmail.com")


API_CONFIG_GSUITE_EMAIL = os.getenv("GSUITE_EMAIL", "malhar@analystt.ai")
API_CONFIG_GSUITE_PASSWORD = os.getenv("GSUITE_PASSWORD", "Malhar123##")
API_CONFIG_REACT_LOGIN_PAGE_URL = os.getenv(
    "API_CONFIG_REACT_LOGIN_PAGE", "http://localhost:3000/login"
)
API_CONFIG_REACT_SIGNUP_PAGE_URL = os.getenv(
    "API_CONFIG_REACT_SIGNUP_PAGE", "http://localhost:3000/signUp"
)
API_CONFIG_SELF_BASE_URL = os.getenv(
    "API_CONFIG_SELF_BASE_URL", "http://localhost:12005"
)

API_CONFIG_SELF_BASE_EXTERNAL_URL = os.getenv("API_CONFIG_SELF_BASE_EXTERNAL_URL","http://localhost:12005")

API_CONFIG_JWT_SECRET = "aaf00868db8310a63b1ee2053b0a458bd4c10272bd47495461ac8d6e34834273"  # Generated using: openssl rand -hex 32

