import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import Optional, List
import motor.motor_asyncio

hostname = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority"

app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(hostname)
db = client.business


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


class RestaurantModel(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str = Field(...)
    rating: int = Field(...)
    cuisine: str = Field(...)

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Sandwich Sandwich Inc",
                "rating": 1,
                "course": "Fast Food"
            }
        }


class UpdateRestaurantModel(BaseModel):
    name: Optional[str]
    rating: Optional[int]
    cuisine: Optional[str]

    class Config:
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
        schema_extra = {
            "example": {
                "name": "Sandwich Sandwich Inc",
                "rating": 1,
                "course": "Fast Food",
            }
        }


@app.post("/", response_description="Add new restaurant", response_model=RestaurantModel)
async def create_restaurant(restaurant: RestaurantModel = Body(...)):
    restaurant = jsonable_encoder(restaurant)
    new_restaurant = await db.reviews.insert_one(restaurant)
    created_restaurant = await db.reviews.find_one({"_id": new_restaurant.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_restaurant)


@app.get(
    "/", response_description="List all restaurants", response_model=List[RestaurantModel]
)
async def list_restaurants():
    restaurants = await db.reviews.find().to_list(1000)
    return restaurants


@app.get(
    "/{id}", response_description="Get a single restaurant", response_model=RestaurantModel
)
async def show_restaurant(id: str):
    if (restaurant := await db.reviews.find_one({"_id": ObjectId(id)})) is not None:
        return restaurant

    raise HTTPException(status_code=404, detail=f"restaurant {ObjectId(id)} not found")


@app.put("/{id}", response_description="Update a restaurant", response_model=RestaurantModel)
async def update_restaurant(id: str, restaurant: UpdateRestaurantModel = Body(...)):
    restaurant = {k: v for k, v in restaurant.dict().items() if v is not None}

    if len(restaurant) >= 1:
        update_result = await db.reviews.update_one({"_id": ObjectId(id)}, {"$set": restaurant})

        if update_result.modified_count == 1:
            if (
                updated_restaurant := await db.reviews.find_one({"_id": ObjectId(id)})
            ) is not None:
                return updated_restaurant

    if (existing_restaurant := await db.reviews.find_one({"_id": ObjectId(id)})) is not None:
        return existing_restaurant

    raise HTTPException(status_code=404, detail=f"Restaurant {ObjectId(id)} not found")


@app.delete("/{id}", response_description="Delete a restaurant")
async def delete_restaurant(id: str):
    delete_result = await db.reviews.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Restaurant {ObjectId(id)} not found")