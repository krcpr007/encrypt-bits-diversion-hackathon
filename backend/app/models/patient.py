from pydantic import BaseModel, Field
from typing import Optional
from bson import ObjectId


class PyMongoObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, field):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)


class Patient(BaseModel):
    id: Optional[PyMongoObjectId] = Field(default=None, alias="_id")
    name: str
    key: str
    imageUrl: str

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        json_schema_extra = {
            "example": {
                "name": "John",
                "key": "123",
                "imageUrl": "https://www.google.com",
            }
        }
