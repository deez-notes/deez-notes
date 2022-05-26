from pymongo import MongoClient
from pprint import pprint
import random
import bson



client = MongoClient(host = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority", 
                            port = 4000, tz_aware=True)
print("Connection Successful!")
print()

bioLines = open('randomBios.txt').read().splitlines()
favoriteSongs = open('songs.txt').read().splitlines()
# print(len(bioLines), len(favoriteSongs), favoriteSongs[20])
# myline =random.choice(lines)
# print(myline)

# userDB = client.accountData
# users = userDB.users.find()

profileDB = client.profileData
profiles = profileDB.profiles.find()

# j = 0
# for i in users:
#     print("\n================", j)


#     profile = {
#         "username": i["username"],
#         "bio": random.choice(bioLines),
#         "favorite_song": favoriteSongs[j]
#     }
#     profileDB.profiles.insert(profile)
#     j+=1

# du = profileDB.profiles.aggregate([{'$group': {'_id':'$_id', 'count': {'$sum': 1}}}, {'$match': {'count': {'$gt': 1}}}])

# pprint(list(du))

# convert ObjectIDs to str
# j = 0
# for i in profiles:
#     print("\n================", j)
#     # pprint(i)
#     # print(i["_id"])
#     if (type(i["_id"]) == bson.objectid.ObjectId):
#         # print(str(i["_id"]))
#         doc = profileDB.profiles.find_one({"_id": i["_id"]})
#         # i["_id"] = str(i["_id"])
#         # print(type(i["_id"]))
#         profileDB.profiles.delete_one({"_id": i["_id"]})
#         # profileDB.profiles.insert(i)

#     j+=1


client.close()