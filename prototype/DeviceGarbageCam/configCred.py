# Importing the file with the protected values, you have to create your own.
import configCredd
# Username to acces the mongoDB cluster
user=configCredd.user
# Password to access the mongoDB cluster
password=configCredd.password
# Clustername on MongoDB
cl=configCredd.cl
# Db name on MongoDB
db=configCredd.db
# Coll is the collection we want to upload to
coll=configCredd.coll
# Description is a string
description=configCredd.description
# Latitude is an array so we can upload in one loop and switch values
latitude=configCredd.latitude
# Longitude is also an array
longitude=configCredd.longitude
# Below is the name to switch out each upload (this can be a single string to have 1 upload)
tempName=configCredd.tempNames