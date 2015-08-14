var db = require('../db/db.js');

module.exports.getTeam = function (team_id, res) {
  db.select('*').from('teams').where('id', team_id).then(
    function (team) {
      res.status(200).send(team[0]);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.changeBacklogPoints = function () {};

module.exports.changeProgressPoints = function () {};

module.exports.changeCompletePoints = function () {};