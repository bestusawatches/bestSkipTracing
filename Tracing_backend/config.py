# DB_URI = 'mongodb://fluentai:uMequah3thep7Paish@172.31.15.79:27017/'
DB_URI = 'mongodb://fluentai:12345678@172.31.15.79:27017/'
DB_NAME = 'fluentai'
DEBUG = True

REDIS_HOST = '172.31.15.79'
REDIS_PORT = 6379

LOGIN_TYPES = {
    "password": 1,
    "google": 2
}

from_mail = "info@devtomaster.com"
SMTP_USER = "AKIAWBYPBBMBD3W5IXGI"
SMTP_PASSWORD = "BL8hYSI2vCgNz+lYUWHsXIwYg117MFqzC9Yzsmn4SGQX"
SMTP_HOST = "email-smtp.ap-south-1.amazonaws.com"
SMTP_PORT = 587

FRONTEND_URL = "https://languru.app"
FRONTEND_VERIFY_PAGE = "verify"
FRONTEND_SIGNUP_PAGE = "signup"

JWT_SECRET = "ViY15eiS40To"

LOGIN_EMAIL_VERIFY_TIME = 30
AUTH_TOKEN_EXPIRY_TIME = 12 * 60

GOOGLE_CLIENT_ID = "493330068136-bcmgb5381077pdp85cbf8ak99cf2lbuf.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET = "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"

DEEPGRAM_API_KEY = "ae9a3406cf09e48c1a4fe3c7643a93801fef6b4f"
OPENAI_API_KEY = "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"
OPENAI_ORG_ID = "org-s0zZl4JntTGBbkVLsklc6xlz"
SPEECHSUPER_SECRET_KEY = "21436866e338891ae68abf41dfd567b6"
SPEECHSUPER_APP_KEY = "16907678350001ab"

FLUENCY_LEVELS = {
    "beginner": 1,
    "intermediate": 2,
    "advanced": 3,
    "fluent": 4,
    "native": 5
}



FLUENCY_LEVEL_MAPPING = {
    1: "beginner",
    2: "intermediate",
    3: "advanced",
    4: "fluent",
    5: "native"
}


MIN_FLUENCY_LEVEL = 1
MAX_FLUENCY_LEVEL = 5

DEFAULT_PAGINATION_PAGE = 1
DEFAULT_PAGINATION_LIMIT = 10

DEEPGRAM_CHINESE_LANG_CODE = "zh-CN"
DEEPGRAM_SPANISH_LANG_CODE = "es"

AWS_S3_ACCESS_KEY_ID = "AKIASLDSAIZDVWI6KTAJ"
AWS_S3_SECRET_KEY = "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"
AWS_S3_BUCKET_NAME = "fluentai-be"
AWS_S3_REGION = "us-east-1"
AWS_S3_BASE_URL = "https://fluentai-be.s3.us-east-1.amazonaws.com/"

AUDIO_FILE_SIGNED_URL_EXPIRY_TIME = 3600
AUDIO_FILE_PATH = "audio"

MESSAGE_TYPES = {
    "user": 1,
    "bot": 2
}


LANGUAGE_MAPPING = {
    1: "zh-CN",
    2: "es"
}

LANGUAGE_NAMES = {
    1: "zh-CN",
    2: "es"
}

OPEN_AI_LANGUAGE_MAPPING = {
    1: "zh",
    2: "es"
}
