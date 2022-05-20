from fastapi import APIRouter, status, Body, HTTPException
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, HTMLResponse
from typing import List

from bson import ObjectId

from models.userModel import UserModel, UpdateUserModel
from hash import get_password_hash
from settings import client


userDataDB = client.accountData

router = APIRouter(prefix="/users",
    tags=["users"],)

@router.post("/", response_description="Create a new user", response_model=UserModel)
async def create_user(user: UserModel = Body(...)):
    user.password = get_password_hash(user.password)
    user = jsonable_encoder(user)
    new_user = await userDataDB.users.insert_one(user)
    created_user = await userDataDB.users.find_one({"_id": new_user.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_user)

@router.get("/", response_description="List all users", response_model=List[UserModel])
async def list_users():
    users = await userDataDB.users.find().to_list(1000)
    return users

@router.get("/{id}", response_description="Get a single user by ObjectID", response_model=UserModel)
async def show_user(id: str):
    if (user := await userDataDB.users.find_one({"_id": ObjectId(id)})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"user {ObjectId(id)} not found")

@router.get("/{username}", response_description="Get a single user by username", response_model=UserModel)
async def show_user_by_username(username: str):
    if (user := await userDataDB.users.find_one({"username": username})) is not None:
        return user

    raise HTTPException(status_code=404, detail=f"user {username} not found")

@router.put("/{id}", response_description="Update a user (username, password, or both)", response_model=UserModel)
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

@router.put("/{username}", response_description="Update a user by username", response_model=UserModel)
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

@router.delete("/{id}", response_description="Delete a user")
async def delete_user(id: str):
    delete_result = await userDataDB.users.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"user {ObjectId(id)} not found")

@router.delete("/{username}", response_description="Delete a user by username")
async def delete_user_by_username(username: str):
    delete_result = await userDataDB.users.delete_one({"username": username})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"user {username} not found")