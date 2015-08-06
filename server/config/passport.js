var LocalStrategy = require('passport-local').Strategy;


// var User            = require('../app/models/user');

module.exports = function(passport) {


  passport.serializeUser(function(user, done){
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done){
    //Mongo Query
    User.findById(id, function(err, user){
      done(err, user);
    });
  });


  passport.use('local-signup', new LocalStrategy({
    emailField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, email, password, done){
    db.select().from('users').where('email', email).then(function(arr){
      if (arr.length === 0) {
        db('users').insert({email: email, password: password}).then(function(){
          console.log('user inserted');
        });
      }
      done();
    });
  }));

  passport.use('local-login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    function(req, email, password, done){
      process.nextTick(function(){
        //Mongo query
        User.findOne({ 'local.username': email}, function(err, user){
          if(err)
            return done(err);
          if(!user)
            return done(null, false, req.flash('loginMessage', 'No User found'));
          if(user.local.password != password){
            return done(null, false, req.flash('loginMessage', 'inavalid password'));
          }
          return done(null, user);

        });
      });
    }
  ));


};
