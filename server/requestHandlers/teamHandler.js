var teamModel = require('../models/teamModel.js');

module.exports.getTeam = function (team_id, res) {
  teamModel.getTeam(team_id, res)
  	.then(function (team) {
  		res.status(200).send(team[0]);
  	})
  	.catch(function (error) {
  		console.error(error);
      	res.status(404).send('Failed to find request resource in database');
  	});
};
