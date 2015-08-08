var User = require('./models/userModel');
var passport = require('passport');
var authStore = require('./config/authStore');


module.exports = function(app){

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/#/signin'}),
  function(req, res) {
    res.redirect('/');
  });

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }

    res.redirect('/#/signin');
  }

};
