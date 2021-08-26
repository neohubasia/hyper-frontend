var express = require('express');
var router = express.Router();
var isLogin = require('connect-ensure-login').ensureLoggedIn;

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('pages/index', { title: 'Express', auth: req.user });
});

router.get('/shop', function(req, res, next) {
  res.render('pages/shop', { title: 'Express', auth: req.user });
});

router.get('/shop-details', function(req, res, next) {
  res.render('pages/shop-details', { title: 'Express', auth: req.user });
});

router.get('/shop-cart', function(req, res, next) {
  res.render('pages/shop-cart', { title: 'Express', auth: req.user });
});

router.get('/checkout', isLogin('/auth/login'), function(req, res, next) { // ensure auth
  res.render('pages/checkout', { title: 'Express', auth: req.user });
});

router.get('/blog', function(req, res, next) {
  res.render('pages/blog', { title: 'Express', auth: req.user });
});

router.get('/blog-details', function(req, res, next) {
  res.render('pages/blog-details', { title: 'Express', auth: req.user });
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { title: 'Express', auth: req.user });
});

module.exports = router;
