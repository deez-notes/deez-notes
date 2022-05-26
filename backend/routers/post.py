from fastapi import APIRouter, status, Body, HTTPException, Depends, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from bson import ObjectId
from typing import List, Union
# from pydantic import Field
import pprint
from models.general import idAndUsernameDependency
from models.postModel import PostModel, UpdatePostModel
from settings import client

postDataDB = client.postData

router = APIRouter(prefix="/posts",
    tags=["posts"],)

class PostDependency():
    def __init__(self, objId: str = None, user: str = None, tags: list = None):
        self.objId = objId
        self.user = user
        self.tags = tags
        
@router.post("/createpost", response_description="Create a new post", response_model=PostModel)
async def create_post(post: PostModel = Body(...)):
    if (not post.id):
        post.id = str(ObjectId())
   
    post = jsonable_encoder(post)
    new_post = await postDataDB.posts.insert_one(post)
    created_post = await postDataDB.posts.find_one({"_id": new_post.inserted_id})
    # print(post)
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_post)

@router.get("/", response_description="Get/list posts", response_model=Union[List[PostModel], PostModel])
async def get_post(commons: idAndUsernameDependency = Depends(), q: Union[List[str], None] = Query(default=None)):
    # print(commons.objId, commons.user)
    if(commons.objId):
        # print("searching by id")
        if (post := await postDataDB.posts.find_one({"_id": commons.objId})) is not None:
            return post
        raise HTTPException(status_code=404, detail=f"post {commons.objId} not found")
    elif(commons.user):
        # print("searching by user")
        posts = await postDataDB.posts.find({"user": commons.user}).to_list(None)
        return posts
    elif (q):
        print("searching by tags")
        print(q)
        posts = await postDataDB.posts.find({"tags": {"$all": q}}).to_list(None)
        return posts
    else:
        # print("list all")
        posts = await postDataDB.posts.find().to_list(None)
        # print(posts)
        return posts

@router.put("/{id}", response_description="Update a post by id", response_model=PostModel)
async def update_post(id: str, post: UpdatePostModel = Body(...)):
    post = {k: v for k, v in post.dict().items() if v is not None}
    
    if len(post) >= 1:
        update_result = await postDataDB.posts.update_one({"_id": id}, {"$set": post})

        if update_result.modified_count == 1:
            if (
                updated_post := await postDataDB.posts.find_one({"_id": id})
            ) is not None:
                return updated_post

    if (existing_post := await postDataDB.posts.find_one({"_id": id})) is not None:
        return existing_post

    raise HTTPException(status_code=404, detail=f"post {id} not found")

@router.put("/comment/{id}", response_description="Comment on a post", response_model=PostModel)
async def comment(id: str, current_user: str, comment: str):
    
    update_result = await postDataDB.posts.update_one({"_id": id}, {"$push": {"comments": [current_user, comment]}})
    if update_result.modified_count == 1:
        if (
            updated_post := await postDataDB.posts.find_one({"_id": id})
        ) is not None:
            return updated_post

    if (existing_post := await postDataDB.posts.find_one({"_id": id})) is not None:
        return existing_post

    raise HTTPException(status_code=404, detail=f"post {id} not found")

@router.put("/rate/{id}", response_description="Rate a post", response_model=PostModel)
async def comment(id: str, score: float):
    
    update_result = await postDataDB.posts.update_one({"_id": id}, {"$inc" : {"score": score, "likes": 1}})
    if update_result.modified_count == 1:
        if (
            updated_post := await postDataDB.posts.find_one({"_id": id})
        ) is not None:
            return updated_post

    if (existing_post := await postDataDB.posts.find_one({"_id": id})) is not None:
        return existing_post

    raise HTTPException(status_code=404, detail=f"post {id} not found")