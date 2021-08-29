var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '572369143904189';
var FACEBOOK_APP_SECRET = '488e19f6071f42e0b9522818620f8be0';

module.exports  = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://itemplate-marketplace.herokuapp.com/auth/facebook/callback",
    // profileFields: ['id', 'emails', 'username', 'displayName', 'name', 'gender', 'profileUrl', 'photos'],
    // profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
    profileFields: ['id', 'username', 'displayName', 'photos', 'email', 'gender', 'name'],
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log("Facebook Profile ", profile)
    done(null, profile);
  }
)