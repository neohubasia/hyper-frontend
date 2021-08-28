var express = require('express');
var router = express.Router();
var passport = require('passport');
var conf = require("../../_data/config.json");
var axiosHandler = require("../../library/axios-handler");

var url = { signup: "/auth/signup" };

router.get(url.signup, function(req, res, next) {
  res.render('auth/signup', { title: 'Signup Page' });
});

router.post(url.signup, function (req, res, next) {
    //   res.render('auth/signup', { title: 'Signup Page' });
    console.log(req.body)
    console.log(axiosHandler);

    // Changed earlier get call with post
    axiosHandler.module.post('/c_api/customer_signup', req.body)
        .then(response => {
            console.log(response)
            // res.redirect("/auth/login");
            res.render('auth/login', {...conf.app, ...response.data });
        })
        .catch(error => {
            console.log(error)
            res.json({
                status: "FAIL",
                message: "Account Signup Error"
            })
        });

});
// router.post(url.login,
//   passport.authenticate('local', {
//     successRedirect: '/',
//     failureRedirect: url.login,
//     failureMessage: true
//   })
// );


module.exports = router;
