from pydantic import BaseModel, Field
from bson import ObjectId
from typing import Optional

class ProfileModel(BaseModel):
    id: str = Field(default=None, alias="_id")
    username: str = Field(...)
    bio: str = Field(...)
    favorite_song: str = Field(default=None)
    
    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "username": "Red",
                "bio": "I'm cheese. I try to be good but sometimes I'm not.",
                "favorite_song": "https://open.spotify.com/track/7bvdDy3BzhU4vWa43ZrMSs"
            }
        }    

class UpdateProfileModel(BaseModel):
    username: Optional[str]
    bio: Optional[str]
    favorite_song: Optional[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
           "example": {
                "username": "Red",
                "bio": "I'm cheese. I try to be good but sometimes I'm not.",
                "favorite_song": "https://open.spotify.com/track/7bvdDy3BzhU4vWa43ZrMSs"
            }
        }    
