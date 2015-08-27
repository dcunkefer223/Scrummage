var userModel = require("../models/userModel.js");
var teamModel = require('../models/teamModel.js');

module.exports.addUser = function (user, cb) {
  userModel.addUser(user, cb);
};

module.exports.findUserByGithubId = function (user, cb) {
  userModel.findUserByGithubId(user, cb);
};

module.exports.joinTeam = function (obj, user, res) {
  var newTeamID;
  teamModel.fetchTeamName(obj.name, res)
  .then(function (newTeam_id) {
    // return userModel.changeTeamId(user.id, newTeam_id[0].id);
    newTeamID = newTeam_id[0].id;
    return userModel.addUserToTeam(user.id, newTeam_id[0].id);
  })
  .then(function () {
    return userModel.changeCurrentTeam(user.id, newTeamID);
  })
  .then(function (response) {
    res.status(201).send({team_id: response[0]});
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send('Error while inserting new team relation into database');
  });

};

module.exports.leaveTeam = function(user, res) {
  userModel.removeUserFromTeam(user.id, user.current_team)
  .then(function () {
    return userModel.changeCurrentTeam(user.id, null);
  })
  .then(function (response) {
    res.status(201).send();
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send('Error while removing user team relation from database');
  });
};
