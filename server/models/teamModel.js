var db = require('../db/db.js');

module.exports.getTeam = function (team_id, res) {
  db.select('*').from('teams').where('id', team_id).then(
    function (team) {
      console.log(team);
      res.status(200).send(team[0]);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.fetchPoints = function (team_id, column) {
  return db.select(column).from('teams').where('id', team_id)
  // (
  //   function (points){
  //     console.log('The points array looks like', JSON.parse(points[0].status));
  //     return JSON.parse(points[0].status);
  //   }, 
  //   function (error){
  //     console.error(error);
  //   }
  // )
};

module.exports.changePoints = function (team_id, column, points) {
  return db('teams').where('id', team_id).update(column, JSON.stringify(points))
  //   function (rows) {
  //     console.log('The updated points are:', rows);
  //   },
  //   function (error) {
  //     console.error(error);
  //   }
  // );
};

// module.exports.fetchProgressPoints = function (team_id) {};

// module.exports.fetchCompletePoints = function (team_id) {};

// module.exports.changeBacklogPoints = function (team_id, points) {};

// module.exports.changeProgressPoints = function (team_id, points) {};

// module.exports.changeCompletePoints = function (team_id, points) {};
