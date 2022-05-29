from fastapi import APIRouter, status, Body, HTTPException, Depends, Query
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from bson import ObjectId
from typing import List, Union
# from pydantic import Field
from datetime import date, datetime

from models.general import idAndUsernameDependency
from models.postModel import PostModel, UpdatePostModel, UserPostRatingModel, UpdateUserPostRatingModel
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
    post.date = datetime.utcnow()
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
        posts = await postDataDB.posts.find({"user": commons.user}).sort([("date", -1)]).to_list(None)
        return posts
    elif (q):
        # print("searching by tags")
        # print(q)
        posts = await postDataDB.posts.find({"tags": {"$all": q}}).sort([("date", -1)]).to_list(None)
        return posts
    else:
        # print("list all")
        posts = await postDataDB.posts.find({}).sort([("date", -1)]).to_list(None)
        # print(posts)
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
async def rate(id: str, current_user: str, score: float):
    if (pastUserRating := await postDataDB.userRatings.find_one({"postID": id, "username":current_user})) is not None:
        # print("found prior rating")
        pastScore = pastUserRating["rating"]
        like_modifier = 0
        if (not score):
            like_modifier = -1
        if not (score-pastScore):
            return await postDataDB.posts.find_one({"_id": id})
        pastUserRating = await postDataDB.userRatings.update_one({"postID": id, "username":current_user}, {"$set": {"rating":score}})
        # print("past score: ", pastScore, " new score: ", score)
        update_result = await postDataDB.posts.update_one({"_id": id}, {"$inc" : {"score": score - pastScore, "likes":like_modifier}})
    else:
        # print("user has not rated yet")
        userRating = {"_id": str(ObjectId()),"username" : current_user, "postID": id, "rating":score}
        userRating = jsonable_encoder(userRating)
        new_userRating = await postDataDB.userRatings.insert_one(userRating)
        update_result = await postDataDB.posts.update_one({"_id": id}, {"$inc" : {"score": score, "likes": 1}})


    if update_result.modified_count == 1:
        if (updated_post := await postDataDB.posts.find_one({"_id": id})) is not None:
            return updated_post

    if (existing_post := await postDataDB.posts.find_one({"_id": id})) is not None:
        return existing_post

    raise HTTPException(status_code=404, detail=f"post {id} not found")

@router.get("/user_ratings/", response_description="Get a users past rating of a post", response_model=UserPostRatingModel)
async def get_past_rating(username: str, postID: str):
    if (postRating := await postDataDB.userRatings.find_one({"username": username, "postID": postID})) is not None:
        return postRating
    raise HTTPException(status_code=404, detail=f"rating of {postID} by {username} not found")