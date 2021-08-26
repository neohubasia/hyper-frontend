var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '2249929971810473';
var FACEBOOK_APP_SECRET = '02ae420a0a05801505031020e3e9359b';

module.exports  = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
      
      console.log(accessToken, refreshToken, profile)
  }
)