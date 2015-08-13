var User = require('./requestHandlers/userHandler.js');
var Task = require('./requestHandlers/taskHandler.js');
var passport = require('passport');
var authStore = require('./config/authStore');

module.exports = function(app){

  function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }

    res.redirect('/#/signin');
  }

  // Auth Routes

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/#/signin' }),
      function (req, res) {
        res.redirect('/#/storyboard');
  });


  // GET requests

  // app.get('/signin', function (req, res){
  //   res.render('signin', { message: req.flash('signinMessage') });
  // });

  // app.get('/signup', function (req, res){
  //   res.render('signup', { message: req.flash('signupMessage') });
  // });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/getallfeatures', function (req, res) {
    // ?sprint_id=integer
    Task.getAllFeatures(req.query.sprint_id, res);
  });

  app.get('/getfeaturesbystatus', function (req, res) {
    // ?sprint_id=integer&status=string
    Task.getFeaturesByStatus(req.query.sprint_id, req.query.status, res);
  });

  app.get('/getcomments', function (req, res) {
    // ?feature_id=integer
    Task.getCommentsOnFeature(req.query.feature_id, res);
  });


  // POST requests

  // app.post('/signup', passport.authenticate('local-signup', {
  //   successRedirect: '/signin',
  //   failureRedirect: '/signup',
  //   failureFlash: true
  // }));

  // app.post('/signin', passport.authenticate('local-signin', {
  //   successRedirect: '/storyBoard',
  //   failureRedirect: '/signin',
  //   failureFlash: true
  // }));
  
  app.post('/addfeature', function (req, res) {
    // feature is {title, description, points, status[complete|inprogress|todo], sprint_id, user_id}
    Task.addFeature(req.body, res);
  });

  app.post('/addcomment', function (req, res) {
    // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
    Task.addCommentToFeature(req.body, res);
  });

  app.post('/changestatus', function (req, res) {
    // {feature_id, status}
    Task.changeFeatureStatus(req.body, res);
  });

  app.post('/changefeaturepoints', function (req, res) {
    // {feature_id, points}
    Task.changeFeaturePoints(req.body, res);
  });

  app.post('/changedesc', function (req, res) {
    // {feature_id, description}
    Task.changeFeatureDescription(req.body, res);
  });

  app.post('/changetitle', function (req, res) {
    // {feature_id, title}
    Task.changeFeatureTitle(req.body, res);
  });

  app.post('/changefeatureuser', function (req, res) {
    // {feature_id, user_id}
    Task.changeFeatureUser(req.body, res);
  });

  app.post('/changeuserteam', function (req, res) {
    // {user_id, team_id}
    User.changeUserTeam(req.body, res);
  });

};
