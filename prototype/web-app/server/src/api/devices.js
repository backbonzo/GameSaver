const { Router } = require('express');

const CameraSchema = require('../models/CameraEntry');

const router = Router();

router.get('/', (req, res) => {
  res.json({
    message: '🌍',
  });
});

router.post('/', (req, res) => {
  const cameraSchema = new CameraSchema(req.body);
  console.log(req.body);
});

module.exports = router;
