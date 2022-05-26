from platform import python_branch
import pymongo
from pymongo import MongoClient
from random import randint
from pprint import pprint #makes printing the data from server look nicer
import names
import bson

client = MongoClient(host = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority", 
                            port = 4000, tz_aware=True)
print("Connection Successful!")
print()


db = client.accountData
# db.users.update_many({type("_id") == bson.objectid.ObjectId}, {"$set": {"_id": str()}})
users = db.users.find()

# update id to be of type str requires adding new one and removing old
# j = 0
# for i in users:
#     print("\n================", j)
#     # pprint(i)
#     print(i["_id"])
#     if (type(i["_id"]) == bson.objectid.ObjectId):
#         # print(str(i["_id"]))
#         # print(db.users.find_one({"_id": i["_id"]}))
#         doc = db.users.find_one({"_id": i["_id"]})
#         # i["_id"] = str(i["_id"])
#         # print(type(i["_id"]))
#         db.users.delete_one({"_id": i["_id"]})
#         # db.users.insert(i)

#         # db.users.update_one({"_id": i["_id"]}, {"$set": {"_id": str(i["_id"])}})
#     # db.users.update_one({"_id" : i.id})
#     j+=1

# for i in range(10):
#     first = names.get_first_name()
#     last = names.get_last_name()
#     print(first + " " + last)

# give users names
# j = 0
# for i in users:
#     print("\n================", j)
#     db.users.update_one({"_id": i["_id"]}, {"$set": {"first_name": names.get_first_name(), "last_name": names.get_last_name()}})
#     j+=1
# me = db.users.find_one({"username": "Red"})
# print(me)
# db.users.update_one({"_id": me["_id"]}, {"$set": {"first_name": names.get_first_name(), "last_name": names.get_last_name()}})

client.close()
