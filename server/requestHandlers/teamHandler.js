var teamModel = require('../models/teamModel.js');
var taskModel = require('../models/taskModel.js');
var userModel = require('../models/userModel.js');

module.exports.getSprintHistory = function (team_id, res) {
  console.log('user team looks like', team_id);
  teamModel.fetchAllSprints(team_id)
    .then(function (response) {
      var results = {};
      results.backlog = [];
      results.progress = [];
      results.dates = [];
      response.forEach(function (obj) {
        results.backlog.push(obj.backlog);
        results.progress.push(obj.backlog + obj.progress);
        results.dates.push(obj.date_changed);
      });
      console.log(results);
      res.status(200).send(results);
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
  var newTeamID;
  var newName = obj.name;
  var currentDate = obj.date;
  var formatDate = function (currentDate) {
    var newDate = new Date(currentDate);
    var currentMonth = newDate.getMonth();
    var currentDay = newDate.getDate();
    return ((currentMonth + 1) + '/' + currentDay);
  };
  currentDate = formatDate(currentDate);
  teamModel.createTeam({name: obj.name, date_changed: currentDate, backlog: 0, progress: 0, complete: 0})
  .then(function (newTeam_id) {
    newTeamID = newTeam_id[0];
    return userModel.addUserToTeam(user.id, newTeam_id[0]);
  })
  .then(function () {
    return userModel.changeCurrentTeam(user.id, newTeamID);
  })
  .then(function (response) {
    res.status(201).send({team_id: response[0]});
  })
  .catch(function (error) {
    console.error(error);
    res.status(500).send('Error while creating team in database');
  });
};

module.exports.getAllPoints = function (team_id, res) {
  teamModel.fetchCurrentPoints(team_id, '*')
    .then(function (response) {
      res.status(201).send(response);
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error while fetching all points');
    });
};
