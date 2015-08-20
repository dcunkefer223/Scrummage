var teamModel = require('../models/teamModel.js');
var taskModel = require('../models/taskModel.js');

module.exports.getTeam = function (team_id, res) {
var resTeam = {};
  teamModel.getTeam(team_id, res)
    .then(function (team) {
      // team[0].backlog = JSON.parse(team[0].backlog);
      // team[0].progress = JSON.parse(team[0].progress);
      // team[0].complete = JSON.parse(team[0].complete);
      resTeam = team[0];
      return teamModel.fetchAllSprints(team_id);
    })
    .then(function (sprints) {
      resTeam.sprints = sprints;
      res.status(200).send(resTeam);
    })
    .catch(function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    });
};

module.exports.createSprint = function (team_id, sprint, res) {
  teamModel.createSprint(team_id, sprint)
    .then(function (id) {
      console.log('Sprint inserted at ID: ' + id[0]);
      res.status(201).send(id);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error while inserting sprint into database');
    });
};

module.exports.updateSprint = function (sprint_id, points, res) {
  teamModel.updateSprint(sprint_id, points)
    .then(function (response) {
      res.status(201).send({sprint_id: sprint_id});
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error while updating sprint in database');
    });
};