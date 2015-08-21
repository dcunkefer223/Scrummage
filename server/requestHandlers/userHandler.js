var userModel = require("../models/userModel.js");

module.exports.addUser = function (user, cb) {
  userModel.addUser(user, cb);
};

module.exports.findUserByGithubId = function (user, cb) {
  userModel.findUserByGithubId(user, cb);
};

module.exports.changeUserTeam = function (obj, user, res) {
  var newTeamID;
  userModel.fetchTeamName(obj.name, res)
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
