import picamera
import time
import pymongo
import bson
import configCred
import os
from bson.binary import Binary

# var that acts as hours which will be multiplied by 3600 sec 
sendEveryH = 0.00277

# set starting point time
startingTime = time.time()

# get current time
currentTime = time.time()

# var that will be x amount of sec, that acts as indicator when to send data after x amount of sec
sendAfterX = 1 + abs(int(3600 * sendEveryH))

while(True):
	while(currentTime-startingTime > sendAfterX):
		# connect to db
		client = pymongo.MongoClient("mongodb+srv://{}:{}@{}.1tstz.mongodb.net/{}?retryWrites=true&w=majority".format(configCred.user, configCred.password, configCred.cl, configCred.db))
		db = client[configCred.db]

		# set camera, and resolution
		cam = picamera.PiCamera()
		cam.resolution = (1280, 720)


		# lets camera to focus during 5 sec
		time.sleep(5)

		# save image
		current_date = time.strftime("%H:%M:%S", time.localtime())

		filename = "img_{}.png".format(current_date)

		cam.capture(filename)

		# save image to db
		coll = db[configCred.coll]

		with open(filename, "rb") as f:
			encoded = Binary(f.read())
			coll.insert_many([{"title": configCred.user, "description": configCred.description ,"image": encoded, "latitude": configCred.latitude , "longitude": configCred.longitude}], ordered=False)


		# remove saved image from local drive
		if filename.endswith('.png'):
			os.remove(filename)

		# close the cam and db con
		client.close()
		cam.close()
		
		# reset starting point
		startingTime = time.time()

	# get current time
	currentTime = time.time()
