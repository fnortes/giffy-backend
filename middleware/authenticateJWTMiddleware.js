const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { accessTokenSecret } = require('../userUtils');

const authenticateJWTMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, accessTokenSecret, (err, user) => {
      if (err) {
        next(createError(403, 'The required authorization header value is not correct.'));
      }

      req.user = user;
      next();
    });
  } else {
    next(createError(401, 'The required authorization header is no present.'));
  }

};

exports.authenticateJWTMiddleware = authenticateJWTMiddleware;