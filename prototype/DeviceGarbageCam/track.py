import picamera
import time
import pymongo
import bson
import configCred
import os
from bson.binary import Binary

# connect to db

client = pymongo.MongoClient("mongodb+srv://{}:{}@devicesdata.1tstz.mongodb.net/{}?retryWrites=true&w=majority".format(configCred.user, configCred.password, configCred.cl))
db = client[configCred.db]

file_meta = db.file_meta

# set camera, and resolution
cam = picamera.PiCamera()
cam.resolution = (1280, 720)

# start preview
cam.start_preview()

# lets camera to focus during 5 sec
time.sleep(5)

# save image
current_date = time.strftime("%H:%M:%S", time.localtime())

filename = "img_{}.png".format(current_date)

cam.capture(filename)

# end preview
cam.stop_preview()

# save image to db
coll = db[configCred.coll]

with open(filename, "rb") as f:
	encoded = Binary(f.read())
	coll.insert_many([{"Device": configCred.user,"filename": filename, "file": encoded, "Cords": configCred.cords}], ordered=False)


# remove saved image from local drive
if filename.endswith('.png'):
	os.remove(filename)

# close the cam and db con
client.close()
cam.close()
