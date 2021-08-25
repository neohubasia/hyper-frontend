var express = require('express');
var router = express.Router();

router.get('/auth/login', function(req, res, next) {
  res.render('auth/login', { title: 'Express' });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/index', { title: 'Express' });
});

router.get('/shop', function(req, res, next) {
  res.render('pages/shop', { title: 'Express' });
});

router.get('/shop-details', function(req, res, next) {
  res.render('pages/shop-details', { title: 'Express' });
});

router.get('/shop-cart', function(req, res, next) {
  res.render('pages/shop-cart', { title: 'Express' });
});

router.get('/checkout', function(req, res, next) {
  res.render('pages/checkout', { title: 'Express' });
});

router.get('/blog', function(req, res, next) {
  res.render('pages/blog', { title: 'Express' });
});

router.get('/blog-details', function(req, res, next) {
  res.render('pages/blog-details', { title: 'Express' });
});

router.get('/contact', function(req, res, next) {
  res.render('pages/contact', { title: 'Express' });
});

module.exports = router;
