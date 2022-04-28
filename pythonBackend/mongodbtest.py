from pymongo import MongoClient
# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
client = MongoClient("mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority")
print("Connection Successful!")

db = client.test_database


client.close()

