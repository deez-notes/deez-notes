from platform import python_branch
import pymongo
from pymongo import MongoClient
from random import randint, sample
from pprint import pprint #makes printing the data from server look nicer
import names
import bson

client = MongoClient(host = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority", 
                            port = 4000, tz_aware=True)
print("Connection Successful!")
print()


db = client.accountData
users = db.users.find()

# db.users.update_many({type("_id") == bson.objectid.ObjectId}, {"$set": {"_id": str()}})

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


#assign everyone a random number of followers and make them follow a random number of other users
# print(list(users))
# print(len(list(users)))
# usernames = db.users.distinct('username')
# print(usernames)
# listOfUsers = list(users)
# print(len(listOfUsers))
# followers = sample(usernames, randint(1, 30))
# following = sample(usernames, randint(1, 30))
# print(followers)
# print("Followers:\n",  followers)
# for i in followers:
    # print(i["username"])
# print("\nFollowing:\n", [i["username"] for i in following])
# for i in following:
    # print(i["username"])

# print("before")
# j = 0
# for i in users:
#     print("\n================", j)
#     # followers = sample(usernames, randint(1, 30))
#     following = sample(usernames, randint(1, 30))
#     db.users.update_one({"_id": i["_id"]}, {"$set": {"following": following}})
#     for k in following:
#         # followedUser = db.users.find_one()
#         db.users.update_one({"username": k}, {"$push": {"followers": i["username"]}})
#     j+=1
# print("after")

client.close()