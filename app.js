var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
// var cookieSession = require('cookie-session');
var expressSession = require('express-session')({
  secret: 'it3mq1at3mark3tq1ac3',
  resave: false,
  saveUninitialized: true,
  cookie: { _expires: (10 * 60 * 1000) } //  10 minutes
});
var passport = require('passport');
var passportLocal = require("./routes/auth/passport-local");
var passportFacebook = require("./routes/auth/passport-facebook");
var passportGoogle = require("./routes/auth/passport-google");

var app = express();
var routeModules = [];
var apiModules = [];

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb', parameterLimit: 10000 }));

app.use(cookieParser());
app.use(expressSession);

app.use(function (req, res, next) {
  var msgs = req.session.messages || [];
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;
  req.session.messages = [];
  next();
});

app.use(passport.initialize());
app.use(passport.authenticate('session'));
passport.use(passportLocal);
passport.use(passportFacebook);
passport.use(passportGoogle);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

// Session-persisted message middleware
app.use(function (req, res, next) {
  var error = req.session.error,
    success = req.session.success,
    notice = req.session.notice;

  delete req.session.error;
  delete req.session.success;
  delete req.session.notice;

  if (error) res.locals.error = error;
  if (notice) res.locals.notice = notice;
  if (success) res.locals.success = success;

  next();
});


app.use(express.static(path.join(__dirname, 'public')));

fs.readdirSync(__dirname + '/routes/pages').forEach(function (name) {
  var obj = require(path.join(__dirname, '/routes/pages/' + name));
  routeModules.push(obj);
});

fs.readdirSync(__dirname + '/routes/api').forEach(function (name) {
  var obj = require(path.join(__dirname, '/routes/api/' + name));
  apiModules.push(obj);
});

// connect to routing files
app.use(routeModules);
app.use(apiModules);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.log("Error found ", err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error/index');
});

module.exports = app;
