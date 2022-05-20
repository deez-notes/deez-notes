from fastapi import APIRouter, status, Body, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse, HTMLResponse
from typing import List, Union

from bson import ObjectId
from models.general import idAndUsernameDependency
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

@router.get("/", response_description="Get Users", response_model=Union[List[UserModel], UserModel])
async def get_user(commons: idAndUsernameDependency = Depends()):
    # print(commons.objId, commons.user)
    if(commons.objId):
        # print("Searching by ID")
        if (user := await userDataDB.users.find_one({"_id": ObjectId(commons.objId)})) is not None:
            return user
        raise HTTPException(status_code=404, detail=f"user {ObjectId(commons.objId)} not found")
    elif(commons.user):
        # print("searching by name")
        if (user := await userDataDB.users.find_one({"username": commons.user})) is not None:
            return user
        raise HTTPException(status_code=404, detail=f"user {commons.user} not found")
    else:
        print("no input")
        users = await userDataDB.users.find().to_list(None)
        return users

@router.put("/", response_description="Update a user (username, password, or both)", response_model=UserModel)
async def update_user(commons: idAndUsernameDependency = Depends(), user: UpdateUserModel = Body(...)):
    if(not commons.objId and not commons.user):
        return HTTPException(status_code=400, detail=f"no input given")

    filter = {"_id": ObjectId(commons.objId)} if commons.objId else {"username": commons.user}
    user = {k: v for k, v in user.dict().items() if v is not None}
    if len(user) >= 1:
        update_result = await userDataDB.users.update_one(filter, {"$set": user})

        if update_result.modified_count == 1:
            if (
                updated_user := await userDataDB.users.find_one(filter)
            ) is not None:
                return updated_user

    if (existing_user := await userDataDB.users.find_one(filter)) is not None:
        return existing_user

    raise HTTPException(status_code=404, detail=f"user {filter} not found")

@router.delete("/", response_description="Delete a user")
async def delete_user(commons: idAndUsernameDependency = Depends()):
    if(not commons.objId and not commons.user):
        return HTTPException(status_code=400, detail=f"no input given")
    filter = {"_id": ObjectId(commons.objId)} if commons.objId else {"username": commons.user}
    delete_result = await userDataDB.users.delete_one(filter)

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"user {filter} not found")