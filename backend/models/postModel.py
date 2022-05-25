from pydantic import BaseModel, Field
from .general import PyObjectId
from bson import ObjectId
from typing import List

class PostModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    title: str = Field(...)
    artist: str = Field(...)
    link: str = Field(...)
    rating: float = Field()
    desc: str = Field(...)
    tags: List = Field(...)
    comments: List = Field()
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
                "timestamp" : "08:10:43",
                "comments": ["wow I love this", "omg same", "etc"]
            }
        }

class UpdatePostModel(BaseModel):
    title: str = Field(...)
    artist: str = Field(...)
    link: str = Field(...)
    rating: float = Field()
    desc: str = Field(...)
    tags: List = Field(...)
    comments: List = Field()
    user: str = Field(...)
    timestamp: str
    
    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "title": "I Love U",
                "artist": "Chainsmokers",
                "link": "https://open.spotify.com/track/3MJE5DoCeAWP7cDbW9Hgm5?si=66b2f95a6dc849bd",
                "rating": 4.5,
                "desc" : 'wowza',
                "tags" : ["omg"],
                "user" : "amusedCheese1",
                "timestamp" : "17:16:47",
                "comments": ["wow I love this", "omg same", "etc"]
            }
        }
