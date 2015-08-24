var User = require('./requestHandlers/userHandler.js');
var Task = require('./requestHandlers/taskHandler.js');
var Team = require('./requestHandlers/teamHandler.js');
var passport = require('passport');
var authStore = require('./config/authStore');

module.exports = function(app){

  function isLoggedIn (req, res, next) {
    if(req.isAuthenticated()){
      return next();
    }
    res.status(404).send();
  }

  // Auth Routes

  app.get('/auth/github', passport.authenticate('github'));

  app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/#/signin' }),
      function (req, res) {
        if(!req.user.current_team) {
          res.redirect('/#/teamsetup');
        } else {
          res.redirect('/#/storyboard');
        }
  });


  // GET requests

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/getteam', function (req, res) {
    // ?team_id=integer
    Team.getTeam(req.query.team_id, res);
  });

  app.get('/getallfeatures', function (req, res) {
    // ?team_id=integer
    Task.getAllFeatures(req.user.current_team, res);
  });

  app.get('/getfeaturesbystatus', function (req, res) {
    // ?team_id=integer&status=string
    Task.getFeaturesByStatus(req.query.team_id, req.query.status, res);
  });

  app.get('/getcomments', function (req, res) {
    // ?feature_id=integer
    Task.getCommentsOnFeature(req.query.feature_id, res);
  });

  app.get('/getallpoints', function (req, res) {
    Team.getAllPoints(req.user.current_team, res);
  })


  // POST requests
  
  app.post('/addfeature', function (req, res) {
    // feature is {name, description, points, status, team_id, user_id}
    Task.addFeature(req.body, req.user, res);
  });

  app.post('/addcomment', function (req, res) {
    // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
    Task.addCommentToFeature(req.body, res);
  });

  app.post('/changestatus', function (req, res) {
    // {feature_id, points, status}
    Task.changeFeatureStatus(req.body, req.user, res);
  });

  app.post('/changefeaturepoints', function (req, res) {
    // {feature_id, points}
    Task.changeFeaturePoints(req.body, res);
  });

  app.post('/changedesc', function (req, res) {
    // {feature_id, description}
    Task.changeFeatureDescription(req.body, res);
  });

  app.post('/changename', function (req, res) {
    // {feature_id, name}
    Task.changeFeatureName(req.body, res);
  });

  app.post('/changefeatureuser', function (req, res) {
    // {feature_id, user_id}
    Task.changeFeatureUser(req.body, res);
  });

  app.post('/updatetotalpoints', function (req, res) {
    // {team_id, points}
    Task.changeTeamPoints(req.body, res);
  });

  app.post('/jointeam', function (req, res) {
    // {user_id, team_id}
    User.joinTeam(req.body, req.user, res);
  });

  app.post('/leaveteam', function (req, res) {

    User.leaveTeam(req.user, res);
  })

  app.post('/addteam', function (req, res) {
    Team.createTeam(req.body, req.user, res);
  });

  app.post('/createsprint', function (req, res) {
    Team.createSprint(req.body, req.user.current_team, res);
  });
};
