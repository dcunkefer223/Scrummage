var teamModel = require('../models/teamModel.js');
var taskModel = require('../models/taskModel.js');
var userModel = require('../models/userModel.js');

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
      res.status(500).send('Failed to find request resource in database');
    });
};

module.exports.createSprint = function (sprint, team_id, res) {
  var sprintData;
  teamModel.createSprint(team_id, sprint)
    .then(function (createdSprint) {
      sprintData = createdSprint[0];
      return teamModel.fetchCurrentPoints(team_id);
    })
    .then(function (response) {
      // console.log('Sprint inserted at ID: ' + id[0]);
      res.status(201).send({team: response[0], sprint: sprintData});
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

module.exports.createTeam = function (obj, user, res) {
  var newName = obj.name;
  teamModel.createTeam({name: obj.name, backlog: 0, progress: 0, complete: 0})
  .then(function (newTeam_id) {
    return userModel.changeCurrentTeam(user.id, newTeam_id[0].id);
  })
  .then(function (response) {
    res.status(201).send({team_id: response[0]});
  })
  .catch(function (error) {
    console.log(error);
    res.status(500).send('Error while creating team in database');
  });
};

module.exports.getAllPoints = function (team_id, res) {
  teamModel.fetchCurrentPoints(team_id, '*')
    .then(function (response) {
      res.status(201).send(response);
    })
    .catch(function (error) {
      console.log(error);
      res.status(500).send('Error while fetching all points');
    });
};
