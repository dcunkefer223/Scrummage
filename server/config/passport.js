// var LocalStrategy = require('passport-local').Strategy;
var User = require('../requestHandlers/userHandler.js');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var LocalStrategy = require('passport-local').Strategy;
// var bcrypt = require('bcrypt');
var flash = require('connect-flash');

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.github_id);
  });

  passport.deserializeUser(function(id, done) {

    User.findUserByGithubId(id, function(err, user) {

      user ? done(null, user) : done(err, null);
    });
  });
  //*************************************************************
  //Github OAuth**
  //*************************************************************
  //Heroku Settings
  passport.use(new GithubStrategy({
    clientID: '5057c4d093220875cc38',
    clientSecret: 'cf79e078480f4dda85ec4946c10353e215d8a9db',
    callbackURL: 'https://scrummage-app.herokuapp.com/auth/github/callback',
    passReqToCallback: true
  },

  //Local Settings
  //   passport.use(new GithubStrategy({
  //   clientID: '3cf6f618800a697e2bc5',
  //   clientSecret: 'b160a044255899ac3cc086064b8783ff40fd0c23',
  //   callbackURL: 'http://127.0.0.1:3000/auth/github/callback',
  //   passReqToCallback: true
  // },
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
          newUser.picture        = profile._json.avatar_url;
          // save our user to the database
          User.addUser(newUser, function(err, results) {
            if (err) throw err;

            // if successful, return the new user
            return done(null, newUser);
          });
        }
      });
    });
  }));


};
  //*************************************************************
  //Local Auth
  //*************************************************************
  // passport.use('local-signup', new LocalStrategy({
  //   usernameField: 'email',
  //   passwordField: 'password',
  //   passReqToCallback: true
  // },
  // function(req, email, password, done){
  //   process.nextTick(function(){
  //     User.findLocalUser(req.email, function(err, user){
  //       if(err)
  //         return done(err);
  //       if(user){
  //         return done(null, false, req.flash('signupMessage', 'That email already exists'));
  //       } else {
  //         var newUser = {};
  //         newUser.email = email;
  //         newUser.password = newUser.generateHash(password);

  //         User.addLocalUser(newUser, function(err, results){
  //           if(err) throw err;
  //           //return user if successful
  //           return done(null, results);
  //         });
  //       }
  //     })
  //   });
  // }));

  // passport.use('local', new LocalStrategy({
  //   usernameField: 'email',
  //   passwordField: 'password',
  //   passReqToCallback: true
  // },
  // function(req, email, password, done){
  //   process.nextTick(function(){
  //     User.findLocalUser(req.email, function(err, user){
  //       if(err)
  //         return done(err);
  //       if(!user)
  //         return done(null, false, req.flash('signinMessage', 'No user found'));
  //       if(!User.generateHash(password)){
  //         return done(null, false, req.flash('signinMessage', 'Invalid password'));
  //       }
  //       return done(null, user);
  //     });
  //   });
  // }
  // ));

