const { Router } = require('express');
// importing our schema
const CameraEntry = require('../models/CameraEntry');
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

// simple post config
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

module.exports = router;
