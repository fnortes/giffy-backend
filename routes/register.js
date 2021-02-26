var express = require('express');
var router = express.Router();
const createError = require('http-errors');
const hash = require('pbkdf2-password')();
const { users } = require('../userUtils');

router.post('/', function (req, res, next) {

  const { username, password } = req.body;

  const alreadyExist = users.find(user => user.username === username);

  if (alreadyExist) next(createError(409, `Already exist a user with the username ${username}`));

  let user = { username, favs: [] };

  hash({ password }, function (err, pass, salt, hash) {

    if (err) throw err;

    // store the salt & hash in the "db"
    user = { ...user, salt, hash };

    users.push(user);

    res.status(201);
    res.send();

  });

});

module.exports = router;