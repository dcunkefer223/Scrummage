//userModel.js
var db = require('../db/db.js');

exports.addUser = function(user, cb){
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

