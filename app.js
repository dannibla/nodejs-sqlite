var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expresshandlebars = require('express-handlebars');

var routes = require('./routes');

var app = express();

var base = '/node/sqlite/';

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', expresshandlebars({
  layoutsDir: 'views',
  defaultLayout: 'layout'
}));

app.set('view engine', 'handlebars');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(base, express.static(path.join(__dirname, 'public')));

app.use(base, routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(err.status || 500);
  var data = {
    message: err.message,
    error: err
  };
  if (req.xhr) {
    res.json(data);
  } else {
    res.render('error', data);
  }
});

app.listen(process.env.PORT || 3000);
