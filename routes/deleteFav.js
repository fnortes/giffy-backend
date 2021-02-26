const express = require('express');
const { authenticateJWTMiddleware } = require('../middleware/authenticateJWTMiddleware');
const { users } = require('../userUtils');
const router = express.Router();

router.delete('/:id', authenticateJWTMiddleware, function (req, res, next) {

  const { username } = req.user;
  const { id } = req.params;
  const user = users.find(u => u.username === username);

  user.favs = user.favs.filter(fav => fav !== id);

  res.status(200);
  res.json({ favs: user.favs });

});

module.exports = router;
