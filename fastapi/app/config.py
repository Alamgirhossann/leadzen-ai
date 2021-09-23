import os

import sentry_sdk

API_CONFIG_EXCEL_FILE_PATH = os.getenv("API_CONFIG_EXCEL_FILE_PATH", "./Excel")
API_CONFIG_PIPL_BASE_URL = os.getenv(
    "API_CONFIG_PIPL_BASE_URL", "https://api.pipl.com/search"
)
API_CONFIG_PIPL_API_KEY = os.getenv(
    "API_CONFIG_PIPL_API_KEY", "x8tent752npf5q26l7w9fv95"
)
API_CONFIG_SELENIUM_SERVER_URL = os.getenv(
    "APP_CONFIG_SELENIUM_SERVER_URL", "http://localhost:4445/wd/hub"
)

API_CONFIG_TEXAU_PROXY_HOST = os.getenv(
    "API_CONFIG_TEXAU_PROXY_HOST", "http://168.81.41.43:47192"
)
API_CONFIG_TEXAU_PROXY_PORT = os.getenv("API_CONFIG_TEXAU_PROXY_PORT", "47192")
API_CONFIG_TEXAU_PROXY_USER = os.getenv(
    "API_CONFIG_TEXAU_PROXY_USER", "malharlakdawala"
)
API_CONFIG_TEXAU_PROXY_PASS = os.getenv("API_CONFIG_TEXAU_PROXY_PASS", "AsHhgbZE")

API_CONFIG_LINKEDIN_CSV_FILE = os.getenv(
    "API_CONFIG_LINKEDIN_CSV_FILE", "linkedin_cookies.csv"
)
API_CONFIG_LINKEDIN_USERNAME = os.getenv(
    "API_CONFIG_LINKEDIN_USERNAME", "tareiljess@yahoo.com"
)
API_CONFIG_LINKEDIN_PASSWORD = os.getenv(
    "API_CONFIG_LINKEDIN_PASSWORD", "Challenge123$"
)
API_CONFIG_LINKEDIN_LOGIN_URL = os.getenv(
    "API_CONFIG_LINKEDIN_LOGIN_URL",
    "https://www.linkedin.com/login?fromSignIn=true&trk=guest_homepage-basic_nav-header-signin",
)
API_CONFIG_LINKEDIN_SEARCH_BASE_URL = os.getenv(
    "API_CONFIG_LINKEDIN_SEARCH_BASE_URL",
    "https://www.linkedin.com/search/results/people/?",
)
API_CONFIG_LINKEDIN_COMPANY_SEARCH_BASE_URL = os.getenv(
    "API_CONFIG_LINKEDIN_COMPANY_SEARCH_BASE_URL",
    "https://www.linkedin.com/search/results/companies/?",
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

API_CONFIG_LINKEDIN_COMPANY_SIZE_CODES_FILE = os.getenv(
    "API_CONFIG_LINKEDIN_COMPANY_SIZE_CODES_FILE",
    "./app/company_size_codes.json",
)

API_CONFIG_TEXAU_URL = os.getenv(
    "API_CONFIG_TEXAU_URL", "https://prod-api.texau.com/api/invoke"
)
API_CONFIG_TEXAU_KEY = os.getenv(
    "API_CONFIG_TEXAU_KEY",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InVzZXJJZCI6ImRmYzE4YTg3LTYxNDItNGQ3Ny1hODMyLWRhOWY4NWI5YzIyOSIsImVtYWlsIjoibWFsaGFybGFrZGF3YWxhQGdtYWlsLmNvbSJ9LCJpYXQiOjE2MjIwMjc5ODZ9.3IxFCMgqZdVom8GIBY57WKYjdNRMhSftN_uwfR6cYX8",
)
API_CONFIG_TEXAU_EXECUTION_URL = os.getenv(
    "API_CONFIG_TEXAU_EXECUTION_URL",
    "https://prod-api.texau.com/api/spices/executions/",
)
API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_SEARCH_RECIPE_ID", "5d403c1ddf129e430077c329"
)
API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_SEARCH_FUNC_ID",
    "texau-automation-1-dev-linkedInSearchExtractor",
)
API_CONFIG_TEXAU_LINKEDIN_SEARCH_SPICE_ID_COMPANY = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_SEARCH_SPICE_ID_COMPANY", "5dfb522a0d074f7c847ece2d"
)
API_CONFIG_TEXAU_LINKEDIN_SEARCH_COMPANY_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_SEARCH_COMPANY_FUNC_ID",
    "texau-automation-1-dev-linkedInCompanySearchExtractor",
)
API_CONFIG_TEXAU_PROXY_NAME = os.getenv(
    "API_CONFIG_TEXAU_PROXY", "BestProxyAndVPN-Pune"
)
API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL = float(
    os.getenv("API_CONFIG_DEFAULT_STATUS_CHECK_INTERVAL", "5.0")
)
API_CONFIG_TRUEMAIL_API_KEY = os.getenv(
    "API_CONFIG_TRUEMAIL_API_KEY",
    "QRnroC9kz3oftU9TN5SAtjnF8wKMWBBphc4RKpBcFHNTXjOFgDijHE3lcvhBFRUn",
)
API_CONFIG_TRUEMAIL_API_URL = os.getenv(
    "API_CONFIG_TRUEMAIL_API_URL",
    "https://truemail.io/api/v1/verify/single?address_info=1&timeout=100&access_token=",
)
API_CONFIG_BULK_INCOMING_DIRECTORY = "./bulk/incoming"
API_CONFIG_BULK_OUTGOING_DIRECTORY = "./bulk/outgoing"
API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_SPICE_ID", "5e4d2381f0a6f62ab94d8207"
)
API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_EMAIL_FUNC_ID",
    "texau-automation-scripts-3-dev-findEmailUsingLinkedin",
)
API_CONFIG_ALLOWED_CONTENT_TYPES = [
    x.strip()
    for x in os.getenv(
        "API_CONFIG_ALLOWED_CONTENT_TYPES", "text/csv, application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    ).split(",")
    if x
]
API_CONFIG_ALLOWED_FILE_TYPE = os.getenv("API_CONFIG_ALLOWED_FILE_TYPE", ".csv")
API_CONFIG_PORT_NUM_INTERNAL = int(os.getenv("API_CONFIG_PORT_NUM_INTERNAL", "12005"))
API_CONFIG_TEXAU_LINKEDIN_EMAIL_SEARCH_URL = f"http://localhost:{API_CONFIG_PORT_NUM_INTERNAL}/api/texau/find_email_and_phone_for_linkedin_profile_url"
API_CONFIG_BULK_PIPL_EMAIL_SEARCH_URL = (
    f"http://localhost:" f"{API_CONFIG_PORT_NUM_INTERNAL}/api/pipl/bulk/email"
)
API_CONFIG_BULK_PIPL_PROFILE_SEARCH_URL = (
    f"http://localhost:" f"{API_CONFIG_PORT_NUM_INTERNAL}/api/pipl/bulk/profile_url"
)
API_CONFIG_SELF_URL = os.getenv(
    "API_CONFIG_SELF_URL", "http://localhost:8000/api/refresh_linkedin_cookie"
)
API_CONFIG_FACEBOOK_LOGIN_URL = os.getenv(
    "API_CONFIG_FACEBOOK_LOGIN_URL", "https://www.facebook.com/"
)
API_CONFIG_TWITTER_LOGIN_URL = os.getenv(
    "API_CONFIG_TWITTER_LOGIN_URL", "https://twitter.com/login"
)
API_CONFIG_INSTA_LOGIN_URL = os.getenv(
    "API_CONFIG_INSTA_LOGIN_URL", "https://www.instagram.com/"
)
API_CONFIG_FACEBOOK_LOGIN_PASSWORD = os.getenv(
    "API_CONFIG_FACEBOOK_LOGIN_PASSWORD", "Challenge123$"
)
API_CONFIG_INSTA_LOGIN_PASSWORD = os.getenv(
    "API_CONFIG_INSTA_LOGIN_PASSWORD", "Challenge123$"
)
API_CONFIG_TWITTER_LOGIN_PASSWORD = os.getenv(
    "API_CONFIG_TWITTER_LOGIN_PASSWORD", "Challenge$123"
)
API_CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME = os.getenv(
    "CONFIG_FACEBOOK_TWITTER_INSTA_USERNAME", "kaylaklug2021@gmail.com"
)
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
API_CONFIG_SELF_BASE_EXTERNAL_URL = os.getenv(
    "API_CONFIG_SELF_BASE_EXTERNAL_URL", "http://localhost:12005"
)
API_CONFIG_JWT_SECRET = "aaf00868db8310a63b1ee2053b0a458bd4c10272bd47495461ac8d6e34834273"  # Generated using: openssl rand -hex 32
API_CONFIG_DATABASE_URL = os.getenv(
     "API_CONFIG_DATABASE_URL", "sqlite:///test.db"
)
API_CONFIG_EMAIL_SEND_URL = (
    f"http://localhost:" f"{API_CONFIG_PORT_NUM_INTERNAL}/api/email/send"
)
API_CONFIG_BULK_MAX_ROWS_IN_CSV = int(
    os.getenv("API_CONFIG_BULK_MAX_ROWS_IN_CSV", "50")
)

# https://docs.pipl.com/docs/rate-limiting-your-queries
API_CONFIG_PIPL_RATE_LIMIT_MAX_CALL_COUNT = int(
    os.getenv("API_CONFIG_PIPL_RATE_LIMIT_MAX_CALLS", "10")
)
API_CONFIG_PIPL_RATE_LIMIT_DURATION_IN_SECONDS = int(
    os.getenv("API_CONFIG_PIPL_RATE_LIMIT_DURATION", "30")
)

API_CONFIG_TEXAU_LINKEDIN_FIND_POST_LIKERS_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_POST_LIKERS_SPICE_ID", "5d403c1ddf129e430077c2fe"
)
API_CONFIG_TEXAU_LINKEDIN_FIND_POST_LIKERS_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_POST_LIKERS_FUNC_ID",
    "texau-automation-1-dev-linkedinpostlikers",
)

API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_SPICE_ID",
    "5d403c1ddf129e430077c335",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_POST_COMMENTERS_FUNC_ID",
    "texau-automation-1-dev-linkedinPostCommenters",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_FUNC_ID",
    "texau-automation-dev-getLinkedinCompanyInfo",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DETAILS_SPICE_ID",
    "5d403c1ddf129e430077c302",
)

API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMPLOYEES_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMPLOYEES_FUNC_ID",
    "texau-automation-1-dev-linkedinCompaniesEmployees",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMPLOYEES_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMPLOYEES_SPICE_ID",
    "5d403c1ddf129e430077c362",
)

API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMAILS_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMAILS_FUNC_ID",
    "texau-automation-2-dev-extractEmail",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMAILS_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_EMAILS_SPICE_ID",
    "5d5b9d2658ad5ac0f87fd3b7",
)

API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_FUNC_ID",
    "texau-automation-new-scripts-dev-nameToDomain",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_SPICE_ID",
    "5de7bde6d9b7c045379ea2ba",
)

API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_SCREENSHOT_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_FUNC_ID",
    "texau-automation-2-dev-takeScreenshot",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_SCREENSHOT_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_SPICE_ID",
    "5d5be27b58ad5ac0f882b55d",
)

API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_STACK_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_FUNC_ID",
    "texau-automation-2-dev-wappalyzer",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_STACK_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_SPICE_ID",
    "5d403c1ddf129e430077c38b",
)

API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_SOCIAL_MEDIA_FUNC_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_FUNC_ID",
    "texau-automation-2-dev-socialMediaLinks",
)
API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_SOCIAL_MEDIA_SPICE_ID = os.getenv(
    "API_CONFIG_TEXAU_LINKEDIN_FIND_COMPANY_DOMAIN_SPICE_ID",
    "5d5b9ba058ad5ac0f87fc2cf",
)

API_CONFIG_PROXY_CURL_ENDPOINT = os.getenv(
    "API_PROXY_CURL_ENDPOINT", "https://nubela.co/proxycurl/api/v2/linkedin"
)
API_CONFIG_PROXY_CURL_API_KEY = os.getenv(
    "API_PROXY_CURL_API_KEY", "0cb3769e-f2b4-45ea-a745-d3b7119be966"
)
API_CONFIG_SNOV_GRANT_TYPE = os.getenv(
    "API_CONFIG_SNOV_GRANT_TYPE", "client_credentials"
)
API_CONFIG_SNOV_CLIENT_ID = os.getenv(
    "API_CONFIG_SNOV_CLIENT_ID", "ca0da7ac0d5bb551ee2963f5c9805c57"
)
API_CONFIG_SNOV_CLIENT_SECRET = os.getenv(
    "API_CONFIG_SNOV_CLIENT_SECRET", "c2d048ef0203d52e67eeea8c8d6bd6e0"
)
API_CONFIG_SNOV_OAUTH_ACESS_TOKEN = os.getenv(
    "API_CONFIG_SNOV_OAUTH_ACESS_TOKEN", "https://api.snov.io/v1/oauth/access_token"
)
API_CONFIG_SNOV_ADD_URL_SEARCH = os.getenv(
    "API_CONFIG_SNOV_ADD_URL_SEARCH", "https://api.snov.io/v1/add-url-for-search"
)
API_CONFIG_SNOV_GET_EMAIL = os.getenv(
    "API_CONFIG_SNOV_GET_EMAIL", "https://api.snov.io/v1/get-emails-from-url"
)
API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS = int(
    os.getenv("API_CONFIG_DEFAULT_CACHING_DURATION_IN_SECONDS", "30")
)
API_CONFIG_MAX_RESULTS_PER_CALL = int(
    os.getenv("API_CONFIG_MAX_RESULTS_PER_CALL", "100")
)
API_CONFIG_GET_USER_FROM_USER_ID_URL = os.getenv(
    "API_CONFIG_GET_USER_FROM_USER_ID_URL", "http://localhost:12005/api/users/"
)


API_CONFIG_SENTRY_DSN = os.getenv(
    "API_CONFIG_SENTRY_DSN",
    "https://5c82fcb5179441aaa52475dec4c2b507@o818106.ingest.sentry.io/5950717",
)


sentry_sdk.init(
    API_CONFIG_SENTRY_DSN,
    # Set traces_sample_rate to 1.0 to capture 100%
    # of transactions for performance monitoring.
    # We recommend adjusting this value in production.
    traces_sample_rate=1.0,
)
API_CONFIG_DATABASE_GET_EMAIL = os.getenv(
    "API_CONFIG_DATABASE_GET_EMAIL", "http://localhost:12005/api/credits/email_search/get"
)
API_CONFIG_DATABASE_ADD_EMAIL = os.getenv(
    "API_CONFIG_DATABASE_ADD_EMAIL", "http://localhost:12005/api/credits/email_search/add"
)
