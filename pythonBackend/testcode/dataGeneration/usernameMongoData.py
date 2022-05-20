from platform import python_branch
import pymongo
from pymongo import MongoClient
from random import randint
from pprint import pprint #makes printing the data from server look nicer

from random_username.generate import generate_username #for usernames
import secrets #for passwords
# print(generate_username())
# print(secrets.token_urlsafe(32))

client = MongoClient(host = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority", 
                            port = 4000, tz_aware=True)
print("Connection Successful!")
print()


db = client.accountData

#Data Generation
# for x in range(1, 501):
#     account= {
#         'username': generate_username()[0],
#         'password': secrets.token_urlsafe(32)
#     }
#     #Step 3: Insert business object directly into MongoDB via insert_one
#     result=db.users.insert_one(account)
#     #Step 4: Print to the console the ObjectID of the new document
#     print('Created {0} of 500 as {1}'.format(x,result.inserted_id))

#ACCESSING
# aUser = db.users.find_one({})
# pprint(aUser)
# userCount = db.users.count_documents({}) 
# print("Num users: ", userCount, "\n")

# #MANIPULATION/UPDATING
# aUser = db.users.find_one({})
# print("sample document: ")
# pprint(aUser)
# result = db.users.update_one({'_id' : aUser.get('_id')}, {'$set': {'password': '5678'}})
# print('Number of documents modified : ' + str(result.modified_count))
# print()

# UpdatedDocument = db.users.find_one({'_id':aUser.get('_id')})
# print('The updated document:')
# pprint(UpdatedDocument)

# #DELETION
# result = db.users.delete_one({'_id': aUser.get('_id')})
# print(result)


#Hashing all passwords
import sys
from .hash import get_password_hash

collection = db.users
cursor = collection.find({})
for document in cursor:
    collection.update_one({"_id":document["_id"]}, {'$set': {'hashed_password': get_password_hash(document["password"])}})

client.close()
