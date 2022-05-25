from platform import python_branch
import pymongo
from pymongo import MongoClient
from random import randint
from pprint import pprint #makes printing the data from server look nicer
import fastapi

client = MongoClient(host = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority", 
                            port = 4000, tz_aware=True)
print("Connection Successful!")
print()


db = client.postData

posts = db.posts.find()
for i in posts:
    pprint(i)
# print(posts)

client.close()
