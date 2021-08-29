var FacebookStrategy = require('passport-facebook').Strategy;
var axiosHandler = require("../../library/axios-handler");

var FACEBOOK_APP_ID = '572369143904189';
var FACEBOOK_APP_SECRET = '488e19f6071f42e0b9522818620f8be0';

module.exports  = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://itemplate-marketplace.herokuapp.com/auth/facebook/callback",
    profileFields: ['id', 'email', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'photos'],
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("Facebook Profile ", profile)
    const profileObj = profile._json;

    let signupObj = {
      email: profileObj.email,
      first_name: profileObj.name,
      displayName: profileObj.name,
      customer_type: "normal",
      account_type: "facebook",
      oauth_profile:  {
        refId: profileObj.id,
        email: profileObj.email,
        displayName: profileObj.name,
        accessToken: accessToken
      }
    };

    axiosHandler.module.post('/c_api/customer_signup', signupObj)
      .then(response => {
        console.log(response)
        if (response.data.status == "SUCCESS") {
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
    done(null, profile);
  }
)