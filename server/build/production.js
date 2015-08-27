var passport = require('passport');

exports.authorizeForAPI = function(req, res, next){
    if(!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      next();
    }
  };

exports.checkUser = function(req, res, next){
  if (!req.isAuthenticated()){
    return res.json({permission: false});
  } else {
    return res.json({permission: true});
  }
};

// Paris
// exports.pgData = {
//       host: 'localhost',
//       database: 'postgres',
//       user : 'postgres',
//       port : 5432,
//       password : '',
//       ssl: false
//     };

// Daniel
// exports.pgData = {
//       host: 'localhost',
//       database: 'jansenfamily',
//       user : 'jansenfamily',
//       port : 5432,
//       password : '',
//       ssl: false
//     };

// Dave
exports.pgData = {
      host: 'localhost',
      database: 'postgres',
      user : 'davidunkefer',
      port : 5432,
      password : '',
      ssl: false
    };


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



var pg = require('pg');
var auth = process.env.DATABASE_URL ? null : require('../config/authStore.js');

//This sets up you connection to the database. if on heroku, it links to the postgres database URL they give us.
//Otherwise, it goes to the auth file and pulls it from there.

//*************************************
//Commenting out Paris settings to test
//*************************************

var db = require('knex')({
  client: 'pg',
  connection: auth.pgData
});

// var db = new pg.Client("");
// db.connect();


module.exports = db;


var db = require('../db/db.js');

module.exports.addFeature = function (feature, res) {
  // feature is {title, description, points, status[complete|inprogress|todo], team_id}
  return db('features').insert(feature).returning('id');
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  db('comments').insert(comment).returning('id').then(
    function (id) {
      console.log('Comment inserted at id: ' + id);
      res.status(201).send({comment_id: id[0]});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to insert comment into database');
    }
  );
};

module.exports.changeFeatureStatus = function (feature_id, newStatus, res) {
  return db('features').where('id', feature_id).update('status', newStatus);
};

module.exports.changeFeaturePoints = function (feature_id, newPoints, res) {
  db('features').where('id', feature_id).update('points', newPoints).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureDescription = function (feature_id, newDesc, res) {
  db('features').where('id', feature_id).update('description', newDesc).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureName = function (feature_id, newName, res) {
  db('features').where('id', feature_id).update('name', newName).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureUser = function (feature_id, user_id, res) {
  db('features').where('id', feature_id).update('team_id', user_id).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.getAllFeatures = function (team_id, res) {
  db.select('*').from('features').where('team_id', team_id).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getCompleteFeatures = function (team_id, res) {
  db.select('*').from('features').where({team_id: team_id, status: 'complete'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getInProgressFeatures = function (team_id, res) {
  db.select('*').from('features').where({team_id: team_id, status: 'inprogress'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getToDoFeatures = function (team_id, res) {
  db.select('*').from('features').where({team_id: team_id, status: 'todo'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getFeaturesByStatus = function (team_id, status, res) {
  db.select('*').from('features').where({team_id: team_id, status: status}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getCommentsOnFeature = function (feature_id, res) {
  db.select('*').from('comments').where('id', feature_id).then(
    function (comments) {
      res.status(200).send(comments);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.changeTeamPoints = function (team_id, newPoints, res) {
  db('teams').where('id', team_id).update('points', newPoints).then(
    function (rows) {
      res.status(200).send({team_id: team_id, points: newPoints});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.getStatusById = function (feature_id) {
  return db.select('status').from('features').where('id', feature_id);
};








var db = require('../db/db.js');

module.exports.getTeam = function (team_id, res) {
  return db.select('*').from('teams').where('id', team_id);
};

module.exports.fetchPoints = function (team_id, column) {
  console.log('in team model we see', team_id, column);
  return db.select(column).from('teams').where('id', team_id);
};

module.exports.changePoints = function (team_id, column, points) {
  return db('teams').where('id', team_id).update(column, JSON.stringify(points));
};

//userModel.js
var db = require('../db/db.js');
// var bcrypt = require('bcrypt');

exports.addUser = function(user, cb){
  // This method is for internal server use
  // user is {email, username, github_id}
  db('users').insert(user).returning('id').then(
    function (id) {
      console.log("User inserted at: " + id[0]);
      cb(null, id);
    },
    function (error) {
      console.error(error);
      cb(error, null);
    }
  );
};

exports.findUserByGithubId = function(id, cb){
  // This method is for internal server use
  db.select('*').from('users').where('github_id', id).then(
    function (user){
      cb(null, user[0]);
    },
    function (error) {
      console.error(error);
      cb(error, null);
    }
  );
};

exports.findLocalUser = function(email, cb){
  db.select('*').from('users').where('email', email).then(function(user){
    console.log('Logged here ');
    cb(null, user[0]);
  });
};


exports.addLocalUser = function(user, cb){
  db('users').insert({email: user.email, password: user.password})
  .then(function(){
    console.log('Local user inserted');
  });
};

exports.generateHash = function(password){
  var hash = bcrypt.hashSync(password, 10);
  console.log('password: ' + password + ' hash: ' + hash);
  return hash;
};

exports.fetchTeamName = function (newTeam_name, res) {
  return db.select('id').from('teams').where('name', newTeam_name);
};

exports.changeTeamId = function (user_id, newTeam_id) {
  return db('users').where('id', user_id).update('team_id', newTeam_id);
};

exports.createTeam = function (newTeam, res) {
  console.log('newTeam in model looks like', newTeam);
  return db('teams').insert(newTeam).returning('id');
};



var taskModel = require('../models/taskModel.js');
var teamModel = require('../models/teamModel.js');

module.exports.addFeature = function (feature, user, res) {
  // feature is {name, description, points, status[complete|progress|backlog], team_id}
  var points;
  var featureId;

  taskModel.addFeature({ name: feature.name, 
                         description: feature.description,
                         points: feature.points,
                         status: feature.status,
                         team_id: user.team_id,
                         user_id: user.id }, res)
    .then(function (id) {
      featureId = id[0];
      // fetch backlog points
      return teamModel.fetchPoints(user.team_id, feature.status);
    })
    .then(function (response){
      // increment backlog points
      points = JSON.parse(response[0][feature.status]);
      points[points.length - 1] += parseInt(feature.points, 10);
      // update backlog points          
      return teamModel.changePoints(user.team_id, feature.status, points);
    })
    .then(function (response) {
      console.log('Feature inserted at id: ' + featureId);
      res.status(201).send({feature_id: featureId});
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error while inserting feature into database');
    });
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  taskModel.addCommentToFeature(comment, res);
};

module.exports.changeFeatureStatus = function (obj, user, res) {
  // check current status
  var points;
  var currentStatus;
  console.log('the user looks like', user);

  taskModel.getStatusById(obj.feature_id)
    .then(function (oldStatus) {
      currentStatus = oldStatus[0].status;
      return teamModel.fetchPoints(user.team_id, currentStatus);
    })
    .then(function (fetchedPoints) {
      points = JSON.parse(fetchedPoints[0][currentStatus]);
      // decrement previous status points
      points[points.length - 1] -= parseInt(obj.points, 10);
      return teamModel.changePoints(user.team_id, currentStatus, points);
    })
    .then(function () {
      // change current status
      return taskModel.changeFeatureStatus(obj.feature_id, obj.status, res);
    })
    .then(function () {
      currentStatus = obj.status;
      return teamModel.fetchPoints(user.team_id, currentStatus);
    })
    .then(function (fetchedPoints) {
      points = JSON.parse(fetchedPoints[0][currentStatus]);
      // increment current status points
      points[points.length - 1] += parseInt(obj.points, 10);
      return teamModel.changePoints(user.team_id, currentStatus, points);
    })
    .then(function () {
      res.status(200).send({feature_id: obj.feature_id});
    })
    .catch(function (error) {
      console.error(error);
    });
};


module.exports.changeFeaturePoints = function (obj, res) {
  taskModel.changeFeaturePoints(obj.feature_id, obj.points, res);
};

module.exports.changeFeatureDescription = function (obj, res) {
  taskModel.changeFeatureDescription(obj.feature_id, obj.description, res);
};

module.exports.changeFeatureName = function (obj, res) {
  taskModel.changeFeatureName(obj.feature_id, obj.name, res);
};

module.exports.changeFeatureUser = function (obj, res) {
  taskModel.changeFeatureUser(obj.feature_id, obj.user_id, res);
};

module.exports.getAllFeatures = function (team_id, res) {
  taskModel.getAllFeatures(team_id, res);
};

module.exports.getFeaturesByStatus = function (team_id, status, res) {
  taskModel.getFeaturesByStatus(team_id, status, res);
};

module.exports.getCommentsOnFeature = function (feature_id, res) {
  taskModel.getCommentsOnFeature(feature_id, res);
};

module.exports.changeTeamPoints = function (obj, res) {
  taskModel.changeTeamPoints(obj.team_id, obj.points, res);
};

var teamModel = require('../models/teamModel.js');
var taskModel = require('../models/taskModel.js');

module.exports.getTeam = function (team_id, res) {
  teamModel.getTeam(team_id, res)
    .then(function (team) {
      team[0].backlog = JSON.parse(team[0].backlog);
      team[0].progress = JSON.parse(team[0].progress);
      team[0].complete = JSON.parse(team[0].complete);
      res.status(200).send(team[0]);
    })
    .catch(function (error) {
      console.error(error);
        res.status(404).send('Failed to find request resource in database');
    });
};

var userModel = require("../models/userModel.js");

module.exports.addUser = function (user, cb) {
  userModel.addUser(user, cb);
};

module.exports.findUserByGithubId = function (user, cb) {
  userModel.findUserByGithubId(user, cb);
};

module.exports.changeUserTeam = function (obj, user, res) {
  userModel.fetchTeamName(obj.name, res)
  .then(function (newTeam_id) {
    return userModel.changeTeamId(user.id, newTeam_id[0].id);
  })
  .then(function (response) {
    res.status(201).send({team_id: response[0]});
  });

};

module.exports.createTeam = function (obj, user, res) {
  var newPoints = JSON.stringify([0]);
  var newName = obj.name;
  userModel.createTeam({name: obj.name, backlog: newPoints, progress: newPoints, complete: newPoints}, res)
  .then(function (newName) {
    return userModel.fetchTeamName(obj.name);
  })
  .then(function (newTeam_id) {
    return userModel.changeTeamId(user.id, newTeam_id[0].id);
  })
  .then(function (response) {
    res.status(201).send({team_id: response[0]});
  });
};

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
        if(!req.user.team_id) {
          res.redirect('/#/teamsetup');
        } else {
          res.redirect('/#/storyboard');
        }
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

  app.get('/getteam', function (req, res) {
    // ?team_id=integer
    Team.getTeam(req.query.team_id, res);
  });

  app.get('/getallfeatures', function (req, res) {
    // ?team_id=integer
    console.log(req.user);
    Task.getAllFeatures(req.user.team_id, res);
  });

  app.get('/getfeaturesbystatus', function (req, res) {
    // ?team_id=integer&status=string
    Task.getFeaturesByStatus(req.query.team_id, req.query.status, res);
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

  app.post('/changeuserteam', function (req, res) {
    // {user_id, team_id}
    User.changeUserTeam(req.body, req.user, res);
  });

  app.post('/addteam', function (req, res) {
    User.createTeam(req.body, req.user, res);
  });

  app.get('/createsprint', function (req, res) {
    Sprint.createSprint(req.body, req.user, res);
  });



};

var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var routes = require(__dirname + '/routes.js');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport);

app.use(bodyParser.json());

// This function is important, it handles the error
// created when bodyParser recieves invalid JSON
app.use(function (err, req, res, next) {
  if(err) {
    console.error(err);
    res.status(400).send('Invalid JSON request');
  } else {
    next();
  }
});

app.use(session({secret: 'anystringoftext',
         saveUninitialized: true,
         resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/../client'));
// app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

routes(app);

app.listen(port);

console.log('Scrummage server running on port: ' + port);


