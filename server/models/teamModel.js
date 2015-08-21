var db = require('../db/db.js');

module.exports.getTeam = function (team_id, res) {
  return db.select('*').from('teams').where('id', team_id);
};

module.exports.fetchPoints = function (team_id, column) {
  // console.log('in team model we see', team_id, column);
  return db.select(column).from('teams').where('id', team_id);
};

module.exports.changePoints = function (team_id, column, points) {
  return db('teams').where('id', team_id).update(column, JSON.stringify(points)).returning('*');
};
