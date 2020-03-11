var express = require('express');
var routes = express.Router();
var models = require('./../models');

// TODO: Show spreadsheets on the main page.
routes.get('/', function(req, res, next) {
  var options = {
    order: [['createdAt', 'DESC']]
  };
  models.Order.findAll(options)
  .then(function(orders) {
    res.render('index', {
      orders: orders
    });
  }, function(err) {
    next(err);
  });
});

routes.get('/create', function(req, res, next) {
  res.render('upsert');
});

routes.get('/edit/:id', function(req, res, next) {
  models.Order.findByPk(req.params.id).then(function(order) {
    if (order) {
      res.render('upsert', {
        order: order
      });
    } else {
      next(new Error('Order not found: ' + req.params.id));
    }
  });
});

routes.get('/delete/:id', function(req, res, next) {
  models.Order.findByPk(req.params.id)
    .then(function(order) {
      if (!order) {
        throw new Error('Order not found: ' + req.params.id);
      }
      return order.destroy();
    })
    .then(function() {
      res.redirect('/node/sqlite/');
    }, function(err) {
      next(err);
    });
});

routes.post('/upsert', function(req, res, next) {
  models.Order.upsert(req.body).then(function() {
    res.redirect('/node/sqlite/');
  }, function(err) {
    next(err);
  });
});

module.exports = routes;
