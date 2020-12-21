const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config(); // Automatically read .env if exist

// Moving middleware functions into their own file
const middelwares = require('./middlewares');

const app = express();

mongoose.connect('process.env.DATABASE_URL', {
  useNewUrlParser: true,
});

// Define app as express use
// Morgan, Helmet and Cors with this.
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  // We let our app know that we will ONLY accept req from this url
  origin: process.env.CORS_ORIGIN,
}));

// Simple get for the / url
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use(middelwares.notFound);
app.use(middelwares.errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
