const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const cookieParser = require('cookie-parser');

require('dotenv').config(); // Automatically read .env if exist
// const modelconn = require('./modelconn');

// Moving middleware functions into their own file
const middelwares = require('./middlewares');
// Routing below
const devices = require('./api/devices');

// User router
const userRouter = require('./routes/User');

const app = express();

let gfs;
// Connecting to mongoDB using mongoose ORM.
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  // eslint-disable-next-line no-console
  console.log('Connected to the device database');
}).catch((err) => {
  // eslint-disable-next-line no-console
  console.error(`Error connecting to the database. \n${err}`);
});
mongoose.Promise = global.Promise;
Grid.mongo = mongoose.mongo;
const { connection } = mongoose;

connection.once('open', () => {
  gfs = Grid(connection.db, mongoose.mongo);
  gfs.collection('fs');
});

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
// Using Cookie Parser (MIGHT need to disable for GDPR) //todo reminder
app.use(cookieParser());

// Simple get for the / url
app.get('/', (req, res) => {
  res.json({
    message: 'Something went wrong, `you\'re not supposed to be here.',
  });
});

// We use the router before the notFound since we want it to register
// and because we want to use it AFTER our middlewares above
app.use('/api/devices', devices);

app.use('/user', userRouter);

// Below is TEST 1, using gfs findOne which renders the picutre only partly not the whole chunk
app.get('/file/:id', (req, res) => {
  const fileId = req.params.id;
  res.contentType('image/png');
  gfs.files.findOne({ _id: fileId }, () => {
    const readstream = gfs.createReadStream({
      _id: fileId,
    });
    readstream.pipe(res);
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
