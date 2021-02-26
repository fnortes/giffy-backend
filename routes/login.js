var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const { accessTokenSecret, authenticate } = require('../userUtils');

router.post('/', function (req, res, next) {

  const { username, password } = req.body;

  authenticate(username, password, function (err, user) {

    if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username, role: user.role }, accessTokenSecret);

      req.session.regenerate(function () {

        req.session.user = user;

        res.json({ jwt: accessToken });

      });
    } else {
      next(createError(403, 'Authentication failed, please check your username and password.'));
    }

  });

});

module.exports = router;