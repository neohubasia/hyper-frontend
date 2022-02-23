var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var axiosHandler = require("../../library/axios-handler");

module.exports = new LocalStrategy(
  {
    usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
  },
  async function (req, username, password, done) {
    const bodyData = { email: username, password: password };
    // way 2 - async/await
    const response = await axiosHandler.module.post(
      "/c-api/customer_login",
      bodyData
    );

    if (!response.data.auth) {
      req.session.error = "Could not log user in. Please try again!"; //inform user could not log them in
      return done(null, false, { message: "Incorrect username or password!" });
    }
    req.session.success = "You are successfully logged in " + username + "!";
    console.log("Login Data ", response.data.user);
    return done(null, response.data.user);
  }
);
