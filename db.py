from pymongo import MongoClient
client = MongoClient()
db = client.readr
users = db.users

def reset_users():
    users.remove()

def add_read(user_id):
    users.insert({'user_id':user_id, 'articles':[] })
    
def lookup_user(user_id):
    return users.find_one({'user_id':user_id})['articles']

def add_info(user_id, info):
    #Put whatever you want in info and it will save it
    users.update({'user_id':user_id}, {'$push':{'articles':info} }) 
