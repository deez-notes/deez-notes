from pydantic import BaseModel, Field
from bson import ObjectId
from .general import PyObjectId
from typing import Optional

class UserModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    username: str = Field(...)
    password: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "username": "[MNI]Red",
                "password" : '1234'
            }
        }

class UpdateUserModel(BaseModel):
    username: Optional[str]
    password: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "username": "[MNI]Red",
                "password" : '1234'
            }
        }