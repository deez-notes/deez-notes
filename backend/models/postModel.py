from pydantic import BaseModel, Field
from .general import PyObjectId
from bson import ObjectId
from typing import List

class PostModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(...)
    artist: str = Field(...)
    link: str = Field(...)
    desc: str = Field(...)
    tags: List = Field(...)
    user: str = Field(...)
    timestamp: str

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "title": "Title",
                "artist": "Post Malone",
                "link": "www.google.com",
                "desc" : '1234',
                "tags" : ["tag1", "tag2", "etc"],
                "user" : "amusedCheese1",
                "timestamp" : "08:10:43"
            }
        }