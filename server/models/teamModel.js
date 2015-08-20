var db = require('../db/db.js');

module.exports.getTeam = function (team_id, res) {
  return db.select('*').from('teams').where('id', team_id);
};

module.exports.fetchCurrentPoints = function (team_id, column) {
  console.log('in team model we see', team_id, column);
  return db.select(column).from('teams').where('id', team_id);
};

module.exports.fetchAllSprints = function (team_id) {
  return db.select('*').from('sprints').where('id', team_id);
};

module.exports.changeCurrentPoints = function (team_id, column, points) {
  return db('teams').where('id', team_id).update(column, points);
};

module.exports.changeSprintPoints = function (sprint_id, column, points) {
  return db('sprints').where('id', sprint_id).update(column, points);
};

module.exports.createSprint = function (team_id, sprint) {
	return db.insert(sprint).into('sprints').returning('id');
};