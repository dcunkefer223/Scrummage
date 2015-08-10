//userModel.js
var db = require('../db/db.js');

exports.addUser = function(user, cb){

  var queryString = "INSERT INTO users (githubid, picture, gender, username) VALUES ("
                     + "'" + user.github_id + "', "
                     + "'" + user.username + "') RETURNING id;";

  // console.log('queryString: ', queryString);
  db('users').insert({email: user.email, username: user.username, github_id: user.github_id}).then(function(){
    // console.log("user inserted");
  })

};

exports.findUserByGithubId = function(id, cb){

  db.select('*').from('users').where('github_id', id).then(function(user){
    // err ? cb(err, null) : cb(null, results.rows[0]);
    cb(null, user[0]);
  });

};

