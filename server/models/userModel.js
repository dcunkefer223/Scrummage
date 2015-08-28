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

module.exports.changeCurrentTeam = function (user_id, newTeam_id) {
  return db('users').where('id', user_id).update('current_team', newTeam_id).returning('current_team');
};

// module.exports.addUserToTeam = function (user_id, newTeam_id) {
//   return db.insert({user_id: user_id, team_id: newTeam_id}).into('users_teams').whereNotExists(function(){
//     this.select('*').from('users_teams').whereRaw({user_id: user_id, team_id: newTeam_id});
//   });
// };

module.exports.addUserToTeam = function (user_id, newTeam_id) {
  return db.raw('insert into "users_teams" ("team_id", "user_id") select ?, ? where not exists (select * from "users_teams" where "user_id" = ? and "team_id" = ?);', [newTeam_id, user_id, user_id, newTeam_id]);
};

module.exports.getUserTeams = function (user_id) {
  return db.select('*').from('users_teams').where('user_id', user_id);
};

module.exports.checkUserTeam = function (user_id, team_id) {
  return db.select('*').from('users_teams').where({user_id: user_id, team_id: team_id});
};

module.exports.removeUserFromTeam = function (user_id, team_id) {
  return db('users_teams').where({user_id: user_id, team_id: team_id}).del();
};