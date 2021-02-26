var express = require('express');
const { authenticateJWTMiddleware } = require('../middleware/authenticateJWTMiddleware');
const { users } = require('../userUtils');
var router = express.Router();

router.post('/', authenticateJWTMiddleware, function (req, res, next) {

  const { username } = req.user;
  const { id } = req.body;
  const { favs } = users.find(u => u.username === username);

  const alreadyExist = favs.find(fav => fav === id);

  if (!alreadyExist) {
    favs.push(id);
  }

  res.status(201);
  res.json({ favs });

});

module.exports = router;
