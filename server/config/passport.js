// var LocalStrategy = require('passport-local').Strategy;
var GithubStrategy = require('passport-github').Strategy;

module.exports = function(passport) {

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {

    User.findUserById(id, function(err, user) {
       console.log(err);
      // if user has a session, they are authenticated
      // if not, returns error
      user ? done(null, user) : done(err, null);
    });
  });

  passport.use(new GithubStrategy({
    clientID: '3cf6f618800a697e2bc5',
    clientSecret: 'b160a044255899ac3cc086064b8783ff40fd0c23',
    callbackURL: 'http://localhost:3000/auth/github/callback',
    passReqToCallback: true
  },

  function(req, accessToken, refreshToken, profile, done){
    console.log(profile);
    // asynchronous
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

          // if there is no user found with that roomease_id, create them
          var newUser = {};

          // take information returned from github and using that data,
          // parse through it and make a newUser object.
          newUser.github_id      = profile.id;
          newUser.picture        = profile._json.avatar_url;
          newUser.username       = profile.displayName;
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
