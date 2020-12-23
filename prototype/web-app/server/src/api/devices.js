const { Router } = require('express');
// importing our schema
const CameraEntry = require('../models/CameraEntry');
// creating the router
const router = Router();

// simple get to test
router.get('/', (req, res) => {
  res.json({
    message: '🌍',
  });
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
