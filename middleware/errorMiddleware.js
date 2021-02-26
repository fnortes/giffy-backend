const errorMiddleware = (err, req, res, next) => {

  const status = err.status || 500;

  res.status(status);
  res.send({
    status,
    error: err.message
  });

}

module.exports = errorMiddleware;