import os
from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel, Field, EmailStr
from bson import ObjectId
from typing import Optional, List
import motor.motor_asyncio
from fastapi.middleware.cors import CORSMiddleware


hostname = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority"

app = FastAPI()
client = motor.motor_asyncio.AsyncIOMotorClient(hostname)
restaurantsDB = client.business

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:8000",
    "http://localhost:8080"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    new_restaurant = await restaurantsDB.reviews.insert_one(restaurant)
    created_restaurant = await restaurantsDB.reviews.find_one({"_id": new_restaurant.inserted_id})
    return JSONResponse(status_code=status.HTTP_201_CREATED, content=created_restaurant)

@app.get(
    "/", response_description="List all restaurants", response_model=List[RestaurantModel]
)
async def list_restaurants():
    restaurants = await restaurantsDB.reviews.find().to_list(1000)
    return restaurants


@app.get(
    "/{id}", response_description="Get a single restaurant by ObjectID", response_model=RestaurantModel
)
async def show_restaurant(id: str):
    if (restaurant := await restaurantsDB.reviews.find_one({"_id": ObjectId(id)})) is not None:
        return restaurant

    raise HTTPException(status_code=404, detail=f"restaurant {ObjectId(id)} not found")


@app.get(
    "/reviews/{name}", response_description="Get a single restaurant by name", response_model=RestaurantModel
)
async def show_restaurant_by_name(name: str):
    if (restaurant := await restaurantsDB.reviews.find_one({"name": name})) is not None:
        return restaurant

    raise HTTPException(status_code=404, detail=f"restaurant {name} not found")


@app.put("/{id}", response_description="Update a restaurant", response_model=RestaurantModel)
async def update_restaurant(id: str, restaurant: UpdateRestaurantModel = Body(...)):
    restaurant = {k: v for k, v in restaurant.dict().items() if v is not None}

    if len(restaurant) >= 1:
        update_result = await restaurantsDB.reviews.update_one({"_id": ObjectId(id)}, {"$set": restaurant})

        if update_result.modified_count == 1:
            if (
                updated_restaurant := await restaurantsDB.reviews.find_one({"_id": ObjectId(id)})
            ) is not None:
                return updated_restaurant

    if (existing_restaurant := await restaurantsDB.reviews.find_one({"_id": ObjectId(id)})) is not None:
        return existing_restaurant

    raise HTTPException(status_code=404, detail=f"Restaurant {ObjectId(id)} not found")

@app.put("/reviews/{name}", response_description="Update a restaurant by name", response_model=RestaurantModel)
async def update_restaurant_by_name(name: str, restaurant: UpdateRestaurantModel = Body(...)):
    restaurant = {k: v for k, v in restaurant.dict().items() if v is not None}

    if len(restaurant) >= 1:
        update_result = await restaurantsDB.reviews.update_one({"name": name}, {"$set": restaurant})

        if update_result.modified_count == 1:
            if (
                updated_restaurant := await restaurantsDB.reviews.find_one({"name": name})
            ) is not None:
                return updated_restaurant

    if (existing_restaurant := await restaurantsDB.reviews.find_one({"name": name})) is not None:
        return existing_restaurant

    raise HTTPException(status_code=404, detail=f"Restaurant {name} not found")


@app.delete("/{id}", response_description="Delete a restaurant")
async def delete_restaurant(id: str):
    delete_result = await restaurantsDB.reviews.delete_one({"_id": ObjectId(id)})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Restaurant {ObjectId(id)} not found")

@app.delete("/reviews/{name}", response_description="Delete a restaurant by name")
async def delete_restaurant_by_name(name: str):
    delete_result = await restaurantsDB.reviews.delete_one({"name": name})

    if delete_result.deleted_count == 1:
        return JSONResponse(status_code=status.HTTP_204_NO_CONTENT)

    raise HTTPException(status_code=404, detail=f"Restaurant {name} not found")