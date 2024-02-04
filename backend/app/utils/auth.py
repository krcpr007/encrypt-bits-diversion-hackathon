from passlib.hash import pbkdf2_sha256
from datetime import datetime, timedelta
import os
import jwt

SECRET_KEY = os.getenv("SECRET_KEY")


def hash_password(password: str):
    return pbkdf2_sha256.hash(password)


def verify_password(password: str, hashed_password: str):
    return pbkdf2_sha256.verify(password, hashed_password)


def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY)
    return encoded_jwt


def create_refresh_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY)
    return encoded_jwt
