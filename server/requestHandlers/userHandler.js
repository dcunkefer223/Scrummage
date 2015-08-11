var userModel = require("../models/userModel.js");

module.exports.addUser = function (user, cb) {
  userModel.addUser(user, cb);
};

module.exports.findUserByGithubId = function (user, cb) {
  userModel.findUserByGithubId(user, cb);
};

module.exports.changeUserTeam = function (obj, res) {
  userModel.changeUserTeam(obj.user_id, obj.newTeam_id, res);
};