var express = require('express');
var router = express.Router();
var passport = require('passport');
var conf = require("../../_data/config.json");

var url = { login: "/auth/login", logout: "/auth/logout" };

router.get(url.login, function(req, res, next) {
  res.render('auth/login', { ...conf.app, data: {} });
});

router.post(url.login,
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: url.login,
    failureMessage: true
  })
);

router.get('/auth/facebook',
  passport.authenticate('facebook', {
    scope: ['email']
  }
));

router.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
      failureRedirect: url.login
    }
  ),
  function(req, res) {
   res.redirect('/');
  }
);

router.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile']
  }
));

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: url.login
  }),
  function (req, res) {
    res.redirect('/')
  }
);

router.get(url.logout, function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
