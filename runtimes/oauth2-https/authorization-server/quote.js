/*jslint node: true */
/*global exports */
'use strict';

var passport = require('passport');
var quoter  = require('../../common/quoter');
/**
 * Simple informational end point, if you want to get information
 * about a particular user.  You would call this with an access token
 * in the body of the message according to OAuth 2.0 standards
 * http://tools.ietf.org/html/rfc6750#section-2.1
 *
 * Example would be using the endpoint of
 * https://localhost:3000/api/userinfo
 *
 * With a GET using an Authorization Bearer token similar to
 * GET /api/userinfo
 * Host: https://localhost:3000
 * Authorization: Bearer someAccessTokenHere
 */
exports.random = [
  passport.authenticate('bearer', {session: false}),
  function (req, res) {
    res.status(200).send(quoter.getRandomOne());
  }
];
