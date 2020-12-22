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
  /* img: {
    data: Buffer,
    contentType: String,
  }, */
}, {
  timestamps: true,
});

const CameraSchema = mongoose.model('CameraSchema', cameraSchema);

module.exports = CameraSchema;
