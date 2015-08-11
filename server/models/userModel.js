//userModel.js
var db = require('../db/db.js');
var bcrypt = require('bcrypt');

exports.addUser = function(user, cb){
  db('users').insert({email: user.email, username: user.username, github_id: user.github_id}).then(function(){
    // console.log("user inserted");
  })
};

exports.findUserByGithubId = function(id, cb){
  db.select('*').from('users').where('github_id', id).then(function(user){
    cb(null, user[0]);
  });
};

exports.findLocalUser = function(email, cb){
  db.select('*').from('users').where('email', email).then(function(user){
    console.log('Logged here ')
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
}
