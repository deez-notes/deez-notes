from pydantic import BaseModel, Field
from bson import ObjectId
from .general import PyObjectId
from typing import Optional

class BasicUserModel(BaseModel):
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "Red",
                "password" : '1234'
            }
        }

class UserModel(BaseModel):
    id: str = Field(default=None, alias="_id")
    username: str = Field(...)
    password: str = Field(...)
    hashed_password: str = Field(default=None)
    first_name: str = Field(default=None)
    last_name: str = Field(default=None)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "username": "Red",
                "password" : '1234',
                "first_name": "Alex",
                "last_name": "Konas"
            }
        }

class UpdateUserModel(BaseModel):
    username: Optional[str]
    password: Optional[str]
    first_name: Optional[str]
    last_name: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "username": "Red",
                "password" : '1234',
                "first_name": "Alex",
                "last_name": "Konas"
            }
        }

"""
User Model

username str
firstname str
lastName str
pass str
hashedPass str
following []
followers []

"""