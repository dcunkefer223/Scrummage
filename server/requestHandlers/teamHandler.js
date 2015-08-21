var teamModel = require('../models/teamModel.js');
var taskModel = require('../models/taskModel.js');

module.exports.getTeam = function (team_id, res) {
  teamModel.getTeam(team_id, res)
    .then(function (team) {
      team[0].backlog = JSON.parse(team[0].backlog);
      team[0].progress = JSON.parse(team[0].progress);
      team[0].complete = JSON.parse(team[0].complete);
      res.status(200).send(team[0]);
    })
    .catch(function (error) {
      console.error(error);
        res.status(404).send('Failed to find request resource in database');
    });
};
