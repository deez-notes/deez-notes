from fastapi import APIRouter, status, Body, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from typing import List, Union
from bson import ObjectId

from models.general import idAndUsernameDependency
from models.profileModel import ProfileModel, UpdateProfileModel
from settings import client


profileDataDB = client.profileData

router = APIRouter(prefix="/profiles",
    tags=["profiles"],)

@router.post("/", response_description="Create a new profile", response_model=ProfileModel)
async def create_profile(profile: ProfileModel = Body(...)):
    if (not profile.id):
        profile.id = str(ObjectId())
        

    profile = jsonable_encoder(profile)
    new_profile = await profileDataDB.profiles.insert_one(profile)
    created_profile = await profileDataDB.profiles.find_one({"_id": new_profile.inserted_id})
   
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_profile)

@router.get("/", response_description="Get Profiles", response_model=Union[List[ProfileModel], ProfileModel])
async def get_profiles(commons: idAndUsernameDependency = Depends()):
    # print(commons.objId, commons.user)
    if(commons.objId):
        # print("Searching by ID")
        if (profile := await profileDataDB.profiles.find_one({"_id": commons.objId})) is not None:
            return profile
        raise HTTPException(status_code=404, detail=f"user {commons.objId} not found")
    elif(commons.user):
        # print("searching by name")
        if (profile := await profileDataDB.profiles.find_one({"username": commons.user})) is not None:
            return profile
        raise HTTPException(status_code=404, detail=f"user {commons.user} not found")
    else:
        # print("no input")
        profile = await profileDataDB.profiles.find().to_list(None)
        # print(profile)
        return profile

@router.put("/", response_description="Update a profile", response_model=ProfileModel)
async def update_profile(commons: idAndUsernameDependency = Depends(), profile: UpdateProfileModel = Body (...)):
    if(not commons.objId and not commons.user):
        return HTTPException(status_code=400, detail=f"no input given")

    filter = {"_id": commons.objId} if commons.objId else {"username": commons.user}
    profile = {k: v for k, v in profile.dict().items() if v is not None}
    if len(profile) >= 1:
        update_result = await profileDataDB.profiles.update_one(filter, {"$set": profile})

        if update_result.modified_count == 1:
            if (
                updated_profile := await profileDataDB.profiles.find_one(filter)
            ) is not None:
                return updated_profile

    if (existing_profile := await profileDataDB.profiles.find_one(filter)) is not None:
        return existing_profile

    raise HTTPException(status_code=404, detail=f"user {filter} not found")