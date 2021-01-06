const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
// GRIDFS TEST REQS
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');

require('dotenv').config(); // Automatically read .env if exist

// Moving middleware functions into their own file
const middelwares = require('./middlewares');
// Routing below
const devices = require('./api/devices');
/* const fileTransfer = require('./api/files'); */
const CameraEntry = require('./models/CameraEntry');

const app = express();

// Connecting to mongoDB using mongoose ORM.
/*
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to database ');
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(`Error connecting to the database. \n${err}`);
});
*/
let gfs;
const conn = mongoose.createConnection(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});

const CameraEntryModelCon = conn.model('CameraEntry', CameraEntry, 'data');

// Define app as express use
// Morgan, Helmet and Cors with this.
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  // We let our app know that we will ONLY accept req from this url
  origin: process.env.CORS_ORIGIN,
}));
// Adding json body parsing middleware from express
app.use(express.json());

// Simple get for the / url
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

/* app.use('api/files', fileTransfer); */

// We use the router before the notFound since we want it to register
// and because we want to use it AFTER our middlewares above
app.use('/api/devices', devices);

app.get('/files', (req, res) => {
  gfs.files.find().toArray((err, files) => {
    // If files exist
    if (!files || files.length === 0) {
      res.status(404);
      throw new Error('No files were found');
    }
    // Files exist
    return res.json(files);
  });
});

app.use(middelwares.notFound);
app.use(middelwares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening at http://localhost:${port}`);
});

module.exports = { conn, CameraEntryModelCon };
