var express = require('express');
var router = express.Router();
var conf = require("../../_data/config.json");
var isLogin = require('connect-ensure-login').ensureLoggedIn;
var axiosHandler = require("../../library/axios-handler");


/* GET home page. */
router.get('/', function (req, res, next) {
  if (req.user) {
    res.locals.authUser = req.user;
    req.user = JSON.stringify(req.user);
  }
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
    axiosHandler.module.get('/api/cart', {
      params: { customerId: req.user._id || req.user.id }
    })
      .then(function (response) {
        res.locals.authUser = req.user;
        req.user = JSON.stringify(req.user);
        res.render('pages/shop-cart', { ...conf.app, auth: req.user, data: response.data.data });
      })
      .catch(function (error) {
        console.log("Error ", error)
        res.render('pages/shop-cart', { ...conf.app, auth: req.user, data: null });
      })
  }
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
    axiosHandler.module.get('/api/cart', {
      params: { customerId: req.user._id || req.user.id }
    })
      .then(function (response) {
        res.locals.authUser = req.user;
        req.user = JSON.stringify(req.user);
        res.render('pages/checkout', { ...conf.app, auth: req.user, data: response.data.data });
      })
      .catch(function (error) {
        console.log("Error ", error)
        res.render('pages/checkout', { ...conf.app, auth: req.user, data: null });
      })
  }
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
