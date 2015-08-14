var teamModel = require('../models/teamModel.js');

module.exports.getTeam = function (team_id, res) {
  teamModel.getTeam(team_id, res);
};
