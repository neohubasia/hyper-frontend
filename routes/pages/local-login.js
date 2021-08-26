var express = require('express');
var router = express.Router();
var passport = require('passport');

var url = { login: "/auth/login", logout: "/auth/logout" };

router.get(url.login, function(req, res, next) {
  res.render('auth/login', { title: 'Login Page' });
});

router.post(url.login, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: url.login,
  failureMessage: true
}));

router.get(url.logout, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
