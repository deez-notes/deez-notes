from fastapi import APIRouter, status, Body, HTTPException, Depends
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
# from bson import ObjectId
from typing import List, Union
# from pydantic import Field

from models.general import idAndUsernameDependency
from models.postModel import PostModel, UpdatePostModel
from settings import client


profileDataDB = client.profileData

router = APIRouter(prefix="/profiles",
    tags=["profiles"],)