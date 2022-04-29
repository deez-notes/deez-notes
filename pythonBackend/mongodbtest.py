# make sure to have already run pip3 install pymongo[srv]
import pymongo
from pymongo import MongoClient
from random import randint
from pprint import pprint #makes printing the data from server look nicer

# connect to MongoDB
client = MongoClient(host = "mongodb+srv://deeznotes:myrxsy7idiEvZCkE@cluster0.widrv.mongodb.net/database?retryWrites=true&w=majority", 
                            port = 4000, tz_aware=True)
print("Connection Successful!")
print()

db = client.business
# SET UP
# names = ['Kitchen','Animal','State', 'Tastey', 'Big','City','Fish', 'Pizza','Goat', 'Salty','Sandwich','Lazy', 'Fun']
# company_type = ['LLC','Inc','Company','Corporation']
# company_cuisine = ['Pizza', 'Bar Food', 'Fast Food', 'Italian', 'Mexican', 'American', 'Sushi Bar', 'Vegetarian']
# for x in range(1, 501):
#     business = {
#         'name' : names[randint(0, (len(names)-1))] + ' ' + names[randint(0, (len(names)-1))]  + ' ' + company_type[randint(0, (len(company_type)-1))],
#         'rating' : randint(1, 5),
#         'cuisine' : company_cuisine[randint(0, (len(company_cuisine)-1))] 
#     }
#     #Step 3: Insert business object directly into MongoDB via insert_one
#     result=db.reviews.insert_one(business)
#     #Step 4: Print to the console the ObjectID of the new document
#     print('Created {0} of 500 as {1}'.format(x,result.inserted_id))


#ACCESSING
afivestar = db.reviews.find_one({'rating': 5})
print(afivestar)
fivestarcount = db.reviews.count_documents({'rating' : 5}) 
# be wary, the link in backend documentation says to use db.reviews.find({'rating':5}).count() THIS DOES NOT WORK
print("Num fivestars: ", fivestarcount)

#MANIPULATION/UPDATING
aReview = db.reviews.find_one({})
print("sample document: ")
pprint(aReview)

result = db.reviews.update_one({'_id' : aReview.get('_id') }, {'$inc': {'likes': 1}})
print('Number of documents modified : ' + str(result.modified_count))

print()

UpdatedDocument = db.reviews.find_one({'_id':aReview.get('_id')})
print('The updated document:')
pprint(UpdatedDocument)

client.close()
