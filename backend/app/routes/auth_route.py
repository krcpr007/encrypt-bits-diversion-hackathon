from datetime import datetime, timedelta
from bson.objectid import ObjectId
from fastapi import APIRouter, Response, status, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from app.models import user
from pymongo.database import Database
from app.config import database
from app.utils import auth
from app.serializers import user_serializers
import os


router = APIRouter()

ACCESS_TOKEN_EXPIRES_IN = os.getenv("ACCESS_TOKEN_EXPIRES_IN")
REFRESH_TOKEN_EXPIRES_IN = os.getenv("REFRESH_TOKEN_EXPIRES_IN")


@router.post("/register", status_code=status.HTTP_201_CREATED)
async def create_user(
    payload: user.CreateUserSchema, db: Database = Depends(database.get_database)
):
    name = payload.name
    email = payload.email
    password = payload.password
    passwordConfirm = payload.passwordConfirm
    user_collection = db["users"]
    user = user_collection.find_one({"email": email})
    if user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )

    if password != passwordConfirm:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Passwords do not match"
        )

    hashed_password = auth.hash_password(password)
    user = {
        "name": name,
        "email": email,
        "password": hashed_password,
        "created_at": datetime.now(),
        "updated_at": datetime.now(),
    }
    try:
        user_collection.insert_one(user)
        return {
            "message": "Created",
            "user": user_serializers.embeddedUserResponse(user),
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        )


@router.post("/login", status_code=status.HTTP_200_OK)
async def login_user(
    payload: user.LoginUserSchema, db: Database = Depends(database.get_database)
):
    email = payload.email
    password = payload.password
    user_collection = db["users"]
    user = user_collection.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
        )
    if not auth.verify_password(password, user["password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )
    access_token_expires = timedelta(minutes=int(ACCESS_TOKEN_EXPIRES_IN))
    refresh_token_expires = timedelta(minutes=int(REFRESH_TOKEN_EXPIRES_IN))
    access_token = auth.create_access_token(
        data={"sub": str(user["_id"])}, expires_delta=access_token_expires
    )
    refresh_token = auth.create_refresh_token(
        data={"sub": str(user["_id"])}, expires_delta=refresh_token_expires
    )
    return {
        "message": "Logged in",
        "access_token": access_token,
        "refresh_token": refresh_token,
    }
