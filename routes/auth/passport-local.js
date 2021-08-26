var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = new LocalStrategy({
       usernameField: 'email',
       passwordField: 'password'
    },
    function (username, password, done) {
        // User.findOne({ username: username }, function(err, user) {
        //   if (err) { return done(err); }
        //   if (!user) {
        //     return done(null, false, { message: 'Incorrect username.' });
        //   }
        //   if (!user.validPassword(password)) {
        //     return done(null, false, { message: 'Incorrect password.' });
        //   }
        //   return done(null, user);
        // });
      
        if (username != "test@gmail.com") {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (password != "test123") {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, {
            displayName: "Demo User", username: "test@gmail.com", password: "test123"
        });
    }
);