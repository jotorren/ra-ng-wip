var express = require('express'),
	auth = require('basic-auth'),
	users = require('../common/users.json'),
  quoter  = require('../common/quoter');

var app = module.exports = express.Router();

var basicAuthCheck = function (req, res, next) {
  var found = false;
  
  var credentials = auth(req);
  if (credentials){
	  for (var i=0; i<users.length && !found; i++){
		  found = (credentials.name === users[i].username && credentials.pass === users[i].password);
	  }
  }

  if (!found) {
	res.statusCode = 401
    res.setHeader('WWW-Authenticate', 'Basic realm="raNg"')
    res.end('Access denied')
  } else {
    return next();
  }
};
app.use('/login', basicAuthCheck);
app.get('/login', function(req, res) {
  res.status(200).json({result: 'Sucessful login'});
});

app.use('/api/protected', basicAuthCheck);
app.get('/api/protected/random-quote', function(req, res) {
  res.status(200).send(quoter.getRandomOne());
});
