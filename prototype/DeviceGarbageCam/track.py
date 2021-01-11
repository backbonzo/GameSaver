import pygame
import pygame.camera
import time
import pymongo
import bson
import configCred
import os
import gridfs
from bson.objectid import ObjectId
from bson.binary import Binary

# init camera and pygame
pygame.init()
pygame.camera.init()

# set up camera
listOfCamera = pygame.camera.list_cameras()
cam = pygame.camera.Camera(listOfCamera[0],(1280,720))

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
		
		try:
			# connect to db
			client = pymongo.MongoClient("mongodb+srv://{}:{}@{}.1tstz.mongodb.net/{}?retryWrites=true&w=majority".format(configCred.user, configCred.password, configCred.cl, configCred.db))
			db = client[configCred.db]
			fs = gridfs.GridFS(db)

			deviceId = ObjectId(("0000000"+configCred.user).encode('utf-8').hex())

			# start camera
			cam.start()
			
			# lets camera to focus during 5 sec
			time.sleep(5)

			# create filename
			filename = "img.png"

			# capture image and save it 
			img = cam.get_image()
			pygame.image.save(img, filename)

			# save image to db
			coll = db[configCred.coll]

			with open(filename, "rb") as f:
				imageData = f.read()
				fsId = fs.put(imageData, title=configCred.user)
				
				# check if this device posted before if yes update the info otherwise create new post 
				document = coll.find_one({'_id': deviceId})

				if (document != None):
					coll.update_one({'_id':deviceId}, {"$set":{"title": configCred.user, "description": configCred.description ,"image_id": fsId, "latitude": configCred.latitude , "longitude": configCred.longitude}}, upsert=False)
				else:
					coll.insert_one({ "_id":deviceId, "title": configCred.user, "description": configCred.description ,"image_id": fsId, "latitude": configCred.latitude , "longitude": configCred.longitude})


			# remove saved image from local drive
			if filename.endswith('.png'):
				os.remove(filename)

			# close the cam and db con
			client.close()
			cam.stop
			print("sent")
		except:
			print("error")
		# reset starting point
		startingTime = time.time()

	# get current time
	currentTime = time.time()