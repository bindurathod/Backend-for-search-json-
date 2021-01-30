var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors =require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var sampleRouter =require('/.routes/sample');
//testApiRouter=require("./routes/testApi");
var app = express();
//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(cors())
//app.use(cors({origin:'http://localhost3000'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/sample',sampleRouter);
//app.use('/testApi',testApiRouter);
// catch 404 and forward to error handler
//app.use(function(req,res,next){
//next(createError(404));
//});
//const express =require('express');
app.use(function(req, res, next) {
res.header("Access-Control-Allow-Origin","*");
res.header("Access-Control-Expose-Headers","Origin,X-Requested-With,Content-Type,Accept");
res.header('Access-Control-Allow-Methods','GET,POST,PUT,DELETE,OPTIONS');
const router = express.Router();
next();
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

//app.listen('9001',() =>{
    //console.log('server is started')
//})
//const bodyParser = require('body-parser');
//const rtsIndex = require('./routes/index.router');
//const { mongo, Mongoose } = require('mongoose');
//const router = express.Router();
//app.use('/api',rtsIndex);
//'/api/register'
//var mongoose= require('mongoose');
//var app=express();
//require('./config/config');
//require('./models/db');
//app.use(bodyParser.json());
app.use(cors());
//app.listen(process.env.PORT, () => console.log('Server started at port : ${process.env.PORT}'));
//var Schema=mo.Schema;
//require('./models/user.model');
//mongoose.connect('mongodb://127.0.0.1:27017/MEANStackDB');
module.exports = app;
