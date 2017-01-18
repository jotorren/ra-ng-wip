var express = require('express');
var http = require('http');
var cors = require('cors');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');

dotenv.load();

var app = express();

// Parsers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:3000'}));

// Catch all for error messages.  Instead of a stack
// trace, this will log the json of the error message
// to the browser and pass along the status with it
app.use(function (err, req, res, next) {
  if (err) {
    res.status(err.status);
    res.json(err);
  } else {
    next();
  }
});

app.use(require('./user-routes'));
app.use(require('./protected-routes'));
app.use(require('../common/public-routes'));

var port = process.env.PORT || 8001;
http.createServer(app).listen(port);
console.log("JWT Authorization Server started on port " + port);