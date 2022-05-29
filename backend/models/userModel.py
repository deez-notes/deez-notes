from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional, List


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
    followers: List = Field(default=[])
    following: List = Field(default=[])


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
    followers: Optional[List]
    following: Optional[List]

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
pass str
hashedPass str
firstname str
lastName str
following []
followers []

"""