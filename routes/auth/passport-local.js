var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var axiosHandler = require("../../library/axios-handler");

module.exports = new LocalStrategy({
       usernameField: 'email',
       passwordField: 'password',
       passReqToCallback: true
    },
    async function (req, username, password, done) {
        const bodyData = { email: username, password: password };

        // way 1
        // axiosHandler.module.post('/c_api/customer_login', bodyData)
        // .then(response => {
        //     if (!response.data.auth) {
        //         done(null, false, { message: 'Incorrect username.' });
        //     }
        //     done(null, response.data.user);
        // })
        // .catch(error => {
        //    console.log(error)
        //    done(error);
        // });

        // way 2
        const response = await axiosHandler.module.post('/c_api/customer_login', bodyData);

        if (!response.data.auth) {
            req.session.error = 'Could not log user in. Please try again!'; //inform user could not log them in
            return done(null, false, { message: 'Incorrect username or password!' });
        }
        req.session.success = 'You are successfully logged in ' + username + '!';
        return done(null, response.data.user);
    }
);