var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const db = require('./db')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var speciesRouter = require('./routes/species');
var animalsRouter = require('./routes/animals');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/species', speciesRouter);
app.use('/animals', animalsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

db.connect(function(err) {   
  if (err) throw err;   
  console.log("Connecté à la base de données MySQL!"); 
  db.query("SELECT * FROM fur", function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});


module.exports = app;
