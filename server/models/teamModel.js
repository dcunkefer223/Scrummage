var db = require('../db/db.js');

module.exports.getTeam = function (team_id, res) {
  return db.select('*').from('teams').where('id', team_id);
};

module.exports.fetchTeamName = function (team_name, res) {
  return db.select('id').from('teams').where('name', team_name);
};

module.exports.createTeam = function (newTeam, res) {
  return db('teams').insert(newTeam).returning('id');
};

module.exports.fetchCurrentPoints = function (team_id) {
  return db.select('*').from('teams').where('id', team_id);
};

module.exports.fetchAllSprints = function (team_id) {
  return db.select('*').from('sprints').where('team_id', team_id);
};

module.exports.changeCurrentPoints = function (team_id, column, points) {
  return db('teams').where('id', team_id).update(column, points).returning('*');
  // update the date as well
};

module.exports.updateTeamDate = function (team_id, date) {
  return db('teams').where('id', team_id).update('date_changed', date).returning('*');
}

module.exports.updateSprint = function (sprint_id, points) {
  return db('sprints').where('id', sprint_id).update(points);
};

module.exports.saveSprint = function (team_id) {
  return db.raw('INSERT INTO "sprints" ("team_id", "backlog", "progress", "complete", "date_changed") SELECT "id", "backlog", "progress", "complete", "date_changed" FROM "teams" WHERE "id" = ?;', [team_id]);
}

module.exports.createSprint = function (team_id, sprint) {
  return db.insert(sprint).into('sprints').returning('*');
};