const mongoose = require('mongoose');

const { Schema } = mongoose;

// * Title - Text
// * Description - Text
// * Location / Owner / id - Number
//    * Coordinates(Longitude, Latitude ?) - Array of Number
// * Date Created / Started - DateTime
// * Image(convert from base64 to image here or server side ?) - Text => URL
// * Data(raw data for debugging)

/* eslint-disable no-unused-vars */
const cameraEntry = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
    unique: true,
    trim: true,
    maxlength: [40, 'Title must be less than 40 characters'],
  },
  description: String,
  image_id: {
    type: mongoose.Schema.ObjectId,
  },
  latitude: {
    type: Number,
    required: true,
    min: -90,
    max: 90,
  },
  longitude: {
    type: Number,
    required: true,
    min: -180,
    max: 180,
  },
}, {
  timestamps: true,
});

module.exports = cameraEntry;
/*
const CameraEntry = conn.model('CameraEntry', cameraEntry, 'data');

module.exports = CameraEntry;
*/
