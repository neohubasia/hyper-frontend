var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '4325494087527349';
var FACEBOOK_APP_SECRET = '4b5e90bfcaf312fee3ba164e01e373a8';

module.exports  = new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
      console.log("catching accessToken here")
      console.log(accessToken, refreshToken, profile)
  }
)