from pydantic import BaseModel, Field
from .general import PyObjectId
from bson import ObjectId
from typing import List

class ProfileModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    
