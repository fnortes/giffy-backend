const express = require('express');
const { authenticateJWTMiddleware } = require('../middleware/authenticateJWTMiddleware');
const { users } = require('../userUtils');
const router = express.Router();

router.get('/', authenticateJWTMiddleware, function (req, res, next) {

  const { username } = req.user;
  const user = users.find(u => u.username === username);

  res.json({ favs: user.favs });

});

module.exports = router;
