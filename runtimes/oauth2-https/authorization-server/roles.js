/*jslint node: true */
/*global exports */
'use strict';

var users   = require('../../common/users.json')

exports.find = [
  function (req, res) {
    res.status(200).json(users);
  }
];
