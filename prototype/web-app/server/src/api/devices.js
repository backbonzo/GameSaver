const { Router } = require('express');
// importing our schema
const CameraEntry = require('../models/CameraEntry');
// DE-structure API_KEY from process.env
const {
  API_KEY,
} = process.env;

// creating the router
const router = Router();

// simple get to see all queries in db
router.get('/', async (req, res, next) => {
  try {
    const entries = await CameraEntry.find();
    res.json(entries);
  } catch (error) {
    next(error);
  }
});

// post request that inputs data into the db, not needed for now only for testing.
router.post('/', async (req, res, next) => {
  try {
    if (req.get('X-API-KEY') !== API_KEY) {
      res.status(401);
      throw new Error('UnAuthorized');
    }
    const cameraEntry = new CameraEntry(req.body);
    const createdEntry = await cameraEntry.save();
    res.json(createdEntry);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.name);
    if (error.name === 'ValidationError') {
      res.status(422);
    }
    // pass the error we catch to our handler via next
    next(error);
  }
});

module.exports = router;
