var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '572369143904189';
var FACEBOOK_APP_SECRET = '488e19f6071f42e0b9522818620f8be0';

module.exports  = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "https://itemplate-marketplace.herokuapp.com/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
    console.log(profile)
    done(null, profile);
  }
)