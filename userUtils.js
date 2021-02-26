const hash = require('pbkdf2-password')();

const accessTokenSecret = 'youraccesstokensecret';

// dummy database
const users = [
  {
    username: 'fnortes',
    favs: []
  }
];

// when you create a user, generate a salt
// and hash the password ('foobar' is the pass here)
hash({ password: 'test' }, function (err, pass, salt, hash) {

  if (err) throw err;

  // store the salt & hash in the "db"
  users[0] = { ...users[0], salt, hash };

});

// Authenticate using our plain-object database of doom!
const authenticate = (name, pass, fn) => {

  if (!module.parent) console.log('authenticating %s:%s', name, pass);

  var user = users.find(u => u.username === name);

  // query the db for the given username
  if (!user) return fn(new Error('cannot find user'));

  // apply the same algorithm to the POSTed password, applying
  // the hash against the pass / salt, if there is a match we
  // found the user
  hash({ password: pass, salt: user.salt }, function (err, pass, salt, hash) {

    if (err) return fn(err);

    if (hash === user.hash) return fn(null, user)

    fn(new Error('invalid password'));

  });

}

exports.accessTokenSecret = accessTokenSecret;
exports.users = users;
exports.authenticate = authenticate;