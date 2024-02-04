from pydantic import BaseModel, EmailStr
from datetime import datetime


class UserBaseSchema(BaseModel):
    name: str
    email: str
    created_at: datetime | None = None
    updated_at: datetime | None = None


class CreateUserSchema(UserBaseSchema):
    password: str
    passwordConfirm: str
    verified: bool = False


class LoginUserSchema(BaseModel):
    email: EmailStr
    password: str


class UserResponseSchema(UserBaseSchema):
    id: str
    pass


class UserResponse(BaseModel):
    status: str
    user: UserResponseSchema
