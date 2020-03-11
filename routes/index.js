var express = require('express');
var routes = express.Router();
var order = require('./order');

routes.use('/', order);
module.exports = routes;
