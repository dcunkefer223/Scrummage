var User = require('./requestHandlers/userHandler.js');
var Task = require('./requestHandlers/taskHandler.js');
var passport = require('passport');
var authStore = require('./config/authStore');


module.exports = function(app){

  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }

    res.redirect('/#/signin');
  }

  // Auth Routes
  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/#/signin'}),
      function (req, res) {
        res.redirect('/#/storyboard');
  });

  // GET requests

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/signin', function(req, res){
      res.render('signin', { message: req.flash('signinMessage') });
  });
  app.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/storyBoard',
    failureRedirect: '/signin',
    failureFlash: true
  }));

  app.get('/signup', function(req, res){
    res.render('signup', { message: req.flash('signupMessage') });
  });


  app.get('/getallfeatures', function (req, res) {
    Task.getAllFeatures(req.body);
  });

  app.get('/getfeaturesbystatus', function (req, res) {
    Task.getFeaturesByStatus(req.body);
  });

  app.get('/getcomments', function (req, res) {
    Task.getCommentsOnFeature(req.body);
  });


  // POST requests

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/signin',
    failureRedirect: '/signup',
    failureFlash: true
  }));
  
  app.post('/addfeature', function (req, res) {
    // feature is {title, description, points, status[complete|inprogress|todo], sprint_id, team_id}
    Task.addFeature(req.body);
  });


};
