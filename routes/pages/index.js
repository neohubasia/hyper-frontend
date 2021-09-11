var express = require('express');
var router = express.Router();
var conf = require("../../_data/config.json");
var isLogin = require('connect-ensure-login').ensureLoggedIn;

/* GET home page. */
router.get('/', function (req, res, next) {
  console.log("Uer Data 1", req.user)
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  console.log("Uer Data 2", req.user)
  res.render('pages/index', { ...conf.app, auth: req.user });
});

router.get('/shop', function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/shop', { ...conf.app, auth: req.user });
});

router.get('/shop-items', function (req, res, next) {
  // categoryid
  // supplierid
  // p,d,l item
  // search item
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/shop-items', { ...conf.app, auth: req.user });
});

router.get('/shop-details', function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/shop-details', { ...conf.app, auth: req.user });
});

router.get('/shop-cart', isLogin('/auth/login'), function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/shop-cart', { ...conf.app, auth: req.user });
});

router.get('/official-store', function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/official-store', { ...conf.app, auth: req.user });
});

router.get('/checkout', isLogin('/auth/login'), function (req, res, next) { // ensure auth
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/checkout', { ...conf.app, auth: req.user });
});

router.get('/contact', function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/contact', { ...conf.app, auth: req.user });
});

router.get('/blog', function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/blog', { ...conf.app, auth: req.user });
});

router.get('/blog-details', function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
  res.render('pages/blog-details', { ...conf.app, auth: req.user });
});

module.exports = router;
