from fastapi import APIRouter, status, Body
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

from bson import ObjectId

from models.postModel import PostModel
from settings import client


postDataDB = client.postData

router = APIRouter(prefix="/posts",
    tags=["posts"],)

@router.post("/createpost", response_description="Create a new post", response_model=PostModel)
async def create_post(post: PostModel = Body(...)):
    post = jsonable_encoder(post)
    new_post = await postDataDB.posts.insert_one(post)
    created_post = await postDataDB.posts.find_one({"_id": new_post.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)