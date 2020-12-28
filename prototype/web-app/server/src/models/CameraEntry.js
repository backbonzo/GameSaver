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
    maxlength: [10, 'Title must be less than 10 characters'],
  },
  description: String,
  image: Buffer,
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

const CameraEntry = mongoose.model('CameraEntry', cameraEntry, 'data');

module.exports = CameraEntry;

// Saving old schema, testing with test schema
/*
const cameraSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please enter a title'],
    unique: true,
    trim: true,
    maxlength: [10, 'Title must be less than 10 characters'],
  },
  description: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formatted_address: String,
    countryCode: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  image: String,
  img: {
    data: Buffer,
    contentType: String,
  },
}, {
  timestamps: true,
});
*/
/*
  createdAt: {
    type: Date,
    default: Date.now,
  },
  */
