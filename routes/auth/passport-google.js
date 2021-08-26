var GoogleStrategy = require('passport-google-oauth2').Strategy;

var GOOGLE_CONSUMER_KEY = '205154145545-i3aimr08cmvffild3iemv5dvuahlieod.apps.googleusercontent.com';
var GOOGLE_CONSUMER_SECRET = 'akvdmOf5kooWuX8If4mATHWb';

module.exports = new GoogleStrategy({
  clientID: GOOGLE_CONSUMER_KEY,
  clientSecret: GOOGLE_CONSUMER_SECRET,
  callbackURL: "https://itemplate-marketplace.herokuapp.com/auth/google/callback",
  passReqToCallback: true
},
  function (request, accessToken, refreshToken, profile, done) {
    console.log(request, accessToken, refreshToken, profile)
    done(null, profile);
  }
);