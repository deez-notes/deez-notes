from numpy import int32
from pydantic import BaseModel, Field
from bson import ObjectId
from typing import List, Optional

class PostModel(BaseModel):
    id: str = Field(default=None, alias="_id")
    title: str = Field(...)
    artist: str = Field(...)
    link: str = Field(...)
    desc: str = Field(...)
    tags: List = Field(...)
    user: str = Field(...)
    timestamp: str = Field(...)
    comments: List[List]= Field(...)
    likes: int = Field(default=0)
    score: float = Field(default=0)
    
    
    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "title": "I Love U",
                "artist": "Chainsmokers",
                "link": "https://open.spotify.com/track/3MJE5DoCeAWP7cDbW9Hgm5?si=66b2f95a6dc849bd",
                "desc" : 'wowza',
                "tags" : ["omg"],
                "user" : "amusedCheese1",
                "timestamp" : "17:16:47",
                "comments": [["amusedCheese1", "wow I love this"], ["holisticMussel9", "omg same"], ["grumpyMoth43", "etc"]]
            }
        }

class UpdatePostModel(BaseModel):
    title: Optional[str]
    artist: Optional[str]
    link: Optional[str]
    score: Optional[float]
    likes: Optional[int]
    desc: Optional[str]
    tags: Optional[List]
    comments: Optional[List[List]]
    user: Optional[str]
    timestamp: Optional[str]
    
    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "title": "I Love U",
                "artist": "Chainsmokers",
                "link": "https://open.spotify.com/track/3MJE5DoCeAWP7cDbW9Hgm5?si=66b2f95a6dc849bd",
                "score": 200,
                "likes": 50,
                "desc" : 'wowza',
                "tags" : ["omg"],
                "user" : "amusedCheese1",
                "timestamp" : "17:16:47",
                "comments": [["amusedCheese1", "wow I love this"], ["holisticMussel9", "omg same"], ["grumpyMoth43", "etc"]]
            }
        }
    
"""
Posts:
title: str 
artist: str
link: str
score: int
likes: int 
desc: str
tags: [str] 
comments: [(username: str, comment: str)] 
user: str
timestamp: str

"""