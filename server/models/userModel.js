//userModel.js
var db = require('../db/db.js');
// var bcrypt = require('bcrypt');

exports.addUser = function(user, cb){
  // This method is for internal server use
  // user is {email, username, github_id}
  db('users').insert(user).returning('id').then(
    function (id) {
      console.log("User inserted at: " + id);
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

exports.changeUserTeam = function (user_id, newTeam_id, res) {
  db('users').where('id', user_id).update('team_id', newTeam_id).then(
    function (rows) {
      res.status(200).send({user_id: user_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

