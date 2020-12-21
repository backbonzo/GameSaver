const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// Define app as express and we will use
// Morgan, Helmet and Cors with this.
const app = express();
app.use(morgan('common'));
app.use(helmet());
app.use(cors({
  // We let our app know that we will ONLY accept req from this url
  origin: 'http://localhost:3000',
}));

// Simple get for the / url
app.get('/', (req, res) => {
  res.json({
    message: 'Hello World',
  });
});

app.use((req, res, next) => {
  // Middleware that creates the 404 not found and fowarding it to the error handling
  const error = new Error(`Not Found - ${req.origninalUrl}`);
  res.status(404);
  next(error);
});

/* eslint-disable no-unused-vars */
app.use((error, req, res, next) => {
  // IF status code is 200 then by default set 500 code OTHERWISE use the status code specified
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    // If we are in production dont show stack errors
    stack: process.env.NODE_ENV === 'production' ? '🍰' : error.stack,
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
