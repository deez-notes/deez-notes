import os
from urllib import response
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import Optional, List
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware


hostname = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority"

backend = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8000/docs#"
]
#allow any of the origins listed above to send requests to the backend
backend.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = motor.motor_asyncio.AsyncIOMotorClient(hostname)
userDataDB = client.accountData
postDataDB = client.postData

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")

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

@backend.post("/createpost", response_description="Create a new post", response_model=PostModel)
async def create_post(post: PostModel = Body(...)):
    post = jsonable_encoder(post)
    new_post = await postDataDB.posts.insert_one(post)
    created_post = await postDataDB.posts.find_one({"_id": new_post.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)

# still need to fetch those posts

@backend.post("/", response_description="Create a new user", response_model=UserModel)
async def create_user(user: UserModel = Body(...)):
    user = jsonable_encoder(user)
    new_user = await userDataDB.users.insert_one(user)
    created_user = await userDataDB.users.find_one({"_id": new_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

@backend.get("/", response_description="List all users", response_model=List[UserModel])
async def list_users():
    users = await userDataDB.users.find().to_list(1000)
    return users

@backend.get("/{id}", response_description="Get a single user by ObjectID", response_model=UserModel)
async def show_user(id: str):
    if (user := await userDataDB.users.find_one({"_id": ObjectId(id)})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"user {ObjectId(id)} not found")

@backend.get("/users/{username}", response_description="Get a single user by username", response_model=UserModel)
async def show_user_by_username(username: str):
    if (user := await userDataDB.users.find_one({"username": username})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"user {username} not found")


@backend.put("/{id}", response_description="Update a user (username, password, or both)", response_model=UserModel)
async def update_user(id: str, user: UpdateUserModel = Body(...)):
    user = {k: v for k, v in user.dict().items() if v is not None}

    if len(user) >= 1:
        update_result = await userDataDB.users.update_one({"_id": ObjectId(id)}, {"$set": user})

        if update_result.modified_count == 1:
            if (
                updated_user := await userDataDB.users.find_one({"_id": ObjectId(id)})
            ) is not None:
                return updated_user

    if (existing_user := await userDataDB.users.find_one({"_id": ObjectId(id)})) is not None:
        return existing_user

    raise HTTPException(status_code=404, detail=f"user {ObjectId(id)} not found")

@backend.put("/users/{username}", response_description="Update a user by username", response_model=UserModel)
async def update_user_by_username(username: str, user: UpdateUserModel = Body(...)):
    user = {k: v for k, v in user.dict().items() if v is not None}

    if len(user) >= 1:
        update_result = await userDataDB.users.update_one({"username": username}, {"$set": user})

        if update_result.modified_count == 1:
            if (
                updated_user := await userDataDB.users.find_one({"username": username})
            ) is not None:
                return updated_user

    if (existing_user := await userDataDB.users.find_one({"name": username})) is not None:
        return existing_user

    raise HTTPException(status_code=404, detail=f"user {username} not found")


@backend.delete("/{id}", response_description="Delete a user")
async def delete_user(id: str):
    delete_result = await userDataDB.users.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"user {ObjectId(id)} not found")

@backend.delete("/users/{username}", response_description="Delete a user by username")
async def delete_user_by_username(username: str):
    delete_result = await userDataDB.users.delete_one({"username": username})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"user {username} not found")

