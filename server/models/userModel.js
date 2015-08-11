//userModel.js
var db = require('../db/db.js');

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

module.exports.changeUserTeam = function (user_id, newTeam_id, res) {
  db('users').where(id, user_id).update(team_id, newTeam_id).then(
    function (rows) {
      res.status(200).send({user_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};