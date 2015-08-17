var userModel = require("../models/userModel.js");

module.exports.addUser = function (user, cb) {
  userModel.addUser(user, cb);
};

module.exports.findUserByGithubId = function (user, cb) {
  userModel.findUserByGithubId(user, cb);
};

module.exports.changeUserTeam = function (obj, user, res) {
  userModel.fetchTeamName(obj.name, res)
  .then(function(newTeam_id) {
    return userModel.changeTeamId(user.id, newTeam_id[0].id);
  })
  .then(function (response) {
    console.log('The response looks like', response);
    res.status(201).send({team_id: response[0]});
  })

};