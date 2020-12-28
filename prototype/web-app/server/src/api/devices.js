const { Router } = require('express');

const fs = require('fs');
// importing our schema
const CameraEntry = require('../models/CameraEntry');
// creating the router
const router = Router();

// simple get to see all queries in db
router.get('/', async (req, res, next) => {
  try {
    const entries = await CameraEntry.findById('5fe9bdc3d97199829505331b');
    res.json(entries);
    const buffer = entries.image;
    // Below we are writing the file and use the base64 data from buffer variable
    fs.writeFileSync('image.png', buffer);
  } catch (error) {
    next(error);
  }
});

// post request that inputs data into the db, not needed for now only for testing.
/*
router.post('/', async (req, res, next) => {
  try {
    const cameraEntry = new CameraEntry(req.body);
    const createdEntry = await cameraEntry.save();
    res.json(createdEntry);
  } catch (error) {
    console.log(error.name);
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    // pass the error we catch to our handler via next
    next(error);
  }
});
*/
module.exports = router;
