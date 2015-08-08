// var LocalStrategy = require('passport-local').Strategy;
var User = require('../model/userModel.js');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {

    User.findUserByGithubId(id, function(err, user) {
       // console.log(err);
      // if user has a session, they are authenticated
      // if not, returns error
      user ? done(null, user) : done(err, null);
    });
  });

  //*************************************************************
  //Github OAuth
  //*************************************************************

  passport.use(new GithubStrategy({
    clientID: '3cf6f618800a697e2bc5',
    clientSecret: 'b160a044255899ac3cc086064b8783ff40fd0c23',
    callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
    passReqToCallback: true
  },

  function(req, accessToken, refreshToken, profile, done){
    // console.log(profile);
    process.nextTick(function() {
      var github_id = profile.id;

      // find the user in the database based on their github_id
      User.findUserByGithubId(github_id, function(err, user) {

        // if there is an error, stop everything and return that
        // i.e. an error connecting to the database
        if (err) return done(err);

        // if the user is found, then log them in
        if (user) {
          return done(null, user);
        } else {

          // if there is no user found, create them
          var newUser = {};

          // take information returned from github and using that data,
          // parse through it and make a newUser object.
          newUser.github_id      = profile.id;
          newUser.username       = profile.username;
          newUser.email          = profile.emails[0].value;
          // save our user to the database
          User.addUser(newUser, function(err, results) {
            if (err) throw err;

            // if successful, return the new user
            return done(null, results);
          });
        }
      });
    });
  }));
};
