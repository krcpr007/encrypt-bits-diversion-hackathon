import os
from pymongo import MongoClient, errors
from pydantic import BaseModel, ValidationError

class User(BaseModel):
    email: str
    password: str

client = MongoClient(os.getenv('DB_URL'))
db = client['test']
users = db['users']

try:
    users.create_index("email", unique=True)
except errors.DuplicateKeyError as e:
    print(f"Duplicate key error: {e}")

def create_user(email: str, password: str):
    user = User(email=email, password=password)
    if users.find_one({"email": user.email}):
        raise ValidationError(f"User with email {user.email} already exists")
    users.insert_one(user.dict())