var express = require('express'),
    quoter  = require('./quoter'),
	users   = require('./users.json');

var app = module.exports = express.Router();

app.get('/api/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});

app.get('/api/users', function(req, res) {
  res.status(200).json(users);
});

app.post('/api/log', function(req, res) {
  console.log("Log " + JSON.stringify(req.body));
  console.log("======================================");
  res.status(200).json(req.body);
});
