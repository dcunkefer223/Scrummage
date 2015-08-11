var User = require('./models/userModel');
var passport = require('passport');
var authStore = require('./config/authStore');

module.exports = function(app){

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/#/signin'}),
  function(req, res) {
    res.redirect('/#/storyboard');
  });

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  // app.get('/signin', function(req, res, next){
  //     res.render('/#/signin');
  // });
  // app.post('/signin', passport.authenticate('local', {
  //   successRedirect: '/storyBoard',
  //   failureRedirect: '/signin',
  //   failureFlash: true
  // }));

  // app.get('/signup', function(req, res){
  //   res.redirect('signup', { message: req.flash('signupMessage') });
  // });
  // app.post('/signup', passport.authenticate('local', {
  //   successRedirect: '/signin',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // }));

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }

    res.redirect('/#/signin');
  }

};
