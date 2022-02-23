var express = require("express");
var router = express.Router();
var conf = require("../../_data/config.json");
var axiosHandler = require("../../library/axios-handler");

var url = { signup: "/auth/signup" };

router.get(url.signup, function (req, res, next) {
  res.render("auth/signup", { ...conf.app, data: {} });
});

router.post(url.signup, function (req, res, next) {
  // Changed earlier get call with post
  req.body.displayName = req.body.first_name;
  req.body.customer_type = "normal";
  req.body.account_type = "itemplate";

  axiosHandler.module
    .post("/c-api/customer_signup", req.body)
    .then((response) => {
      if (response.data.status == "SUCCESS") {
        req.session.success = "Your account is created. Please log in!";
        res.redirect("/auth/login");
      } else {
        req.session.error = "Could not create user. Please try again!";
        res.redirect(url.signup);
      }
    })
    .catch((error) => {
      console.log(error);
      req.session.error = "Could not create user. Please try again!";
      res.redirect(url.signup);
    });
});

module.exports = router;
