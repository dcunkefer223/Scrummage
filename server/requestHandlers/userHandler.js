var userModel = require("../models/userModel.js");

module.exports.addUser = function (user, cb) {
  userModel.addUser(user, cb);
};

module.exports.findUserByGithubId = function (user, cb) {
  userModel.findUserByGithubId(user, cb);
};

module.exports.changeUserTeam = function (obj, user, res) {
  userModel.fetchTeamName(obj.name, res)
  .then(function (newTeam_id) {
    return userModel.changeTeamId(user.id, newTeam_id[0].id);
  })
  .then(function (response) {
    res.status(201).send({team_id: response[0]});
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