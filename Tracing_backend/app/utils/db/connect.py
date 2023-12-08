from pymongo import MongoClient
from pymongo.errors import ServerSelectionTimeoutError
from starlette.background import BackgroundTasks

from config import DB_URI,DB_NAME

mongo_client = MongoClient(DB_URI)
db = mongo_client[DB_NAME]

