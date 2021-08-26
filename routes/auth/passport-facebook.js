var FacebookStrategy = require('passport-facebook').Strategy;

var FACEBOOK_APP_ID = '552644495952234';
var FACEBOOK_APP_SECRET = 'c77489a194f57a5a43cab4affe86c3a7';

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
      // console.log(accessToken, refreshToken, profile)
      // done(null, profile)
  }
)