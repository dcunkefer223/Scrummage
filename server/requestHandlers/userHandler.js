var userModel = require("../models/userModel.js");
var teamModel = require('../models/teamModel.js');

module.exports.addUser = function (user, cb) {
  userModel.addUser(user, cb);
};

module.exports.findUserByGithubId = function (user, cb) {
  userModel.findUserByGithubId(user, cb);
};

module.exports.changeUserTeam = function (obj, user, res) {
  teamModel.fetchTeamName(obj.name, res)
  .then(function (newTeam_id) {
    return userModel.changeTeamId(user.id, newTeam_id[0].id);
  })
  .then(function (response) {
    res.status(201).send({team_id: response[0]});
  });

};
