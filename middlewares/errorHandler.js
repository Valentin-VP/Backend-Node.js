function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.log(err);
  next(err);
}

function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({ error: err.message, stack: err.stack });
}

function boomErrorHandler(err, req, res, next) {
  console.log('boomErrorHandler');
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    next(err);
  }
}

module.exports = { logErrors, errorHandler, boomErrorHandler };
