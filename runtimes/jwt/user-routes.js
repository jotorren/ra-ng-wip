var express = require('express'),
    _       = require('lodash'),
    config  = require('./config'),
    jwt     = require('jsonwebtoken');

var app = module.exports = express.Router();

var users = require('../common/users.json');

function createToken(user) {
  return jwt.sign(_.omit(user, 'password'), config.secret, { expiresIn: 60*60*5 });
}

app.post('/jwt/token', function(req, res) {

  if (!req.body.username || !req.body.password) {
    return res.status(400).send("You must send the username and the password");
  }

  var user;
  for (var i=0; i<users.length && !user; i++){
	  if (req.body.username === users[i].username && req.body.password === users[i].password){
		  user = users[i];
	  }
  }
	  
  if (!user) {
   return res.status(400).send("Invalid credentials");
  }

  res.status(201).send({
    id_token: createToken(user)
  });
});

