const notFound = (req, res, next) => {
  // Middleware that creates the 404 not found and fowarding it to the error handling
  const error = new Error(`Not Found - ${req.origninalUrl}`);
  res.status(404);
  next(error);
};

/* eslint-disable no-unused-vars */
const errorHandler = (error, req, res, next) => {
  // IF status code is 200 then by default set 500 code OTHERWISE use the status code specified
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: error.message,
    // If we are in production dont show stack errors
    stack: process.env.NODE_ENV === 'production' ? '🍰' : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
