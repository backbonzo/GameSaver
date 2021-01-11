const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
<<<<<<< HEAD
=======
// GRIDFS TEST REQS
const crypto = require('crypto');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
>>>>>>> main
const Grid = require('gridfs-stream');

require('dotenv').config(); // Automatically read .env if exist

// Moving middleware functions into their own file
const middelwares = require('./middlewares');
// Routing below
const devices = require('./api/devices');
/* const fileTransfer = require('./api/files'); */

const app = express();

let gfs;
// Connecting to mongoDB using mongoose ORM.
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
mongoose.Promise = global.Promise;
Grid.mongo = mongoose.mongo;
const { connection } = mongoose;
<<<<<<< HEAD

connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('fs');
});
=======
>>>>>>> main

connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('fs');
});
/*
let gfs;
const conn = mongoose.createConnection(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('fs');
});
*/
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

<<<<<<< HEAD
// Below is fetch images,using gfs findOne which renders the picutre only partly not the whole chunk
app.get('/file/:id', (req, res, next) => {
  const fileId = req.params.id;
  res.contentType('image/png');
  gfs.files.findOne({ _id: fileId }, () => {
    try {
      const readstream = gfs.createReadStream({
        _id: fileId,
      });
      readstream.pipe(res);
    } catch (error) {
      next(error);
    }
=======
// Below is TEST 1, using gfs findOne which renders the picutre only partly not the whole chunk
app.get('/file/:id', (req, res) => {
  const fileId = req.params.id;
  res.contentType('image/png');
  gfs.files.findOne({ _id: fileId }, (files, err) => {
    /* if (!file || file.length === 0) {
      console.log(`FILE_MF: ${file}`);
      return res.status(404).json({
        err: 'Could not find what you were looking for',
      });
    } */
    // File exists
    // return res.json(file);
    // read output
    // const readstream = gfs.createReadStream(file.id);
    // readstream.pipe(res);
    /* if (files.length < 0) {
      console.log('Files was less then zero');
      console.log(files.length);
    } */
    const readstream = gfs.createReadStream({
      _id: fileId,
    });
    readstream.pipe(res);
  });
});

// BELOW IS TEST 2, using gfs.FIND instead of FindOne(seems to not be supported anymore)
app.get('/file1/:id', (req, res) => {
  res.contentType('image/png');
  gfs.find({ _id: req.params.id }).toArray((err, files) => {
    // if files
    if (!files || files.length === 0) {
      // eslint-disable-next-line no-console
      console.log('Files not found');
    }
    const readstream = gfs.createReadStream({
      _id: req.params.id,
    });
    readstream.on('data', (chunk) => {
      res.write(chunk);
    });
    readstream.on('end', () => {
      res.end();
    });
    readstream.pipe(res);
>>>>>>> main
  });
});

// Route to display all files disable this in production
app.get('/allfiles', (req, res) => {
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

/*
.toArray((err, files) => {
    // If files exist
    if (!files || files.length === 0) {
      res.status(404);
      throw new Error('No files were found');
    }
    // Files exist
    return res.json(files);
  }); */
