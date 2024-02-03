from pymongo.mongo_client import MongoClient
from fastapi import HTTPException
import os
## get the environment variables username, password and db_url and replate the values
username = os.getenv("USERNAME") or ""
password = os.getenv("PASSWORD") or ""
db_url_str = os.getenv("DB_URL") or ""
db_url = db_url_str.replace("<username>", username).replace("<password>", password)
# print(db_url, username, password, db_url_str, "hello")
client = None
database = None


def connect_to_database():
    print(db_url)
    global client, database
    print("Connecting to MongoDB database....")
    try:
        client = MongoClient(db_url)
        database = client["test"]
        print("Connected to MongoDB database ✅")
    except Exception as e:
        print("Error while connecting to MongoDB ❌", e)


def close_connection():
    global client
    print("Closing the database connection....")
    try:
        client.close()
        print("Database connection closed ✅")
    except Exception as e:
        print("Error while closing the connection❌", e)


def get_database():
    return database
