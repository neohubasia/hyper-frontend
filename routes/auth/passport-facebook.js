var FacebookStrategy = require('passport-facebook').Strategy;
var axiosHandler = require("../../library/axios-handler");

var FACEBOOK_APP_ID = '572369143904189';
var FACEBOOK_APP_SECRET = '488e19f6071f42e0b9522818620f8be0';

module.exports = new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "https://itemplate-marketplace.herokuapp.com/auth/facebook/callback",
  profileFields: ['id', 'displayName', 'photos', 'email', 'gender'],
  // profileFields: ['id', 'emails', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'photos'],
  // profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    const profileObj = profile._json;

    let signupObj = {
      email: profileObj.email,
      first_name: profileObj.name,
      displayName: profileObj.name,
      customer_type: "normal",
      account_type: "facebook",
      oauth_profile: {
        refId: profileObj.id,
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
)