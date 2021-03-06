var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var helmet = require('helmet')
const Db = require('./DB.js');

var index = require('./routes/index');
var register = require('./routes/register');
var sample=require('./routes/sample')
//var models=require('./models/db')
var app = express();

// Connect to mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/mydatabase");

// MongoDB Users Schema (Used for Login and Registration)
var userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  salt: String,
  usergroup: 0,

});
var User = mongoose.model("User", userSchema);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet())

app.use('/', index);
//app.use('/api/Register', Register);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
