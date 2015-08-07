var User = require('./model/userModel');
var passport = require('passport');
var authStore = require('./config/authStore');


module.exports = function(app){
  // app.get('/', function(req, res){
  //   res.render('/');
  // });

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/#/landing'}),
  function(req, res) {
    res.redirect('/');
  });

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }

    res.redirect('/landing');
  }

};
