var GoogleStrategy = require('passport-google-oauth2').Strategy;
var axiosHandler = require("../../library/axios-handler");

var GOOGLE_CONSUMER_KEY = '205154145545-i3aimr08cmvffild3iemv5dvuahlieod.apps.googleusercontent.com';
var GOOGLE_CONSUMER_SECRET = 'akvdmOf5kooWuX8If4mATHWb';

module.exports = new GoogleStrategy({
  clientID: GOOGLE_CONSUMER_KEY,
  clientSecret: GOOGLE_CONSUMER_SECRET,
  callbackURL: "https://itemplate-marketplace.herokuapp.com/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    const profileObj = profile._json;

    let signupObj = {
      email: profileObj.email,
      first_name: profileObj.given_name,
      last_name: profileObj.family_name,
      displayName: profileObj.name,
      customer_type: "normal",
      account_type: "gmail",
      oauth_profile: {
        refId: profileObj.sub,
        email: profileObj.email,
        displayName: profileObj.name,
        accessToken: accessToken
      }
    };

    axiosHandler.module.post('/c-api/customer_signup', signupObj)
      .then(response => {
        if (response.data.status == "SUCCESS") {
          console.log("Sign Up Data ", response.data.data)
          return done(null, response.data.data);
        }
        else {
          req.session.error = 'Could not create user now. Please try again!';
          return done(null, false, { message: 'Account Signup Error' });
        }
      })
      .catch(error => {
        console.log(error)
        return done(null, false, error);
      });
  }
);