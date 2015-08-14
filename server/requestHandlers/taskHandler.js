var taskModel = require('../models/taskModel.js');
var teamModel = require('../models/teamModel.js');

module.exports.addFeature = function (feature, res) {
  // feature is {name, description, points, status[complete|progress|backlog], team_id}
  taskModel.addFeature(feature, res);
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  taskModel.addCommentToFeature(comment, res);
};

module.exports.changeFeatureStatus = function (obj, res) {
  // check current status
  var points;
  var currentStatus;

  taskModel.getStatusById(obj.feature_id)
    .then( function(oldStatus) {
      currentStatus = oldStatus[0].status;
      console.log('CurrentStatus looks like', currentStatus);
      teamModel.fetchPoints(1, currentStatus)
        .then(function (fetchedPoints) {
          console.log('fetched points looks like', fetchedPoints[0][currentStatus]);
          points = JSON.parse(fetchedPoints[0][currentStatus]);
          console.log('Points looks like', typeof points);
          // decrement previous status points
          console.log('DB start is', points[0]);
          console.log('DB points are', points[points.length - 1]);
          console.log('Obj points are', obj);
          points = parseInt(points[1]);
          points -= obj.points;
          console.log('subtracted points is', points);
          teamModel.changePoints(1, currentStatus, points)
            .then(
              function(resp) {
                console.log('It worked!');
            });
      });
    });
  };
//   // change current status
//   taskModel.changeFeatureStatus(obj.feature_id, obj.status, res);

//   // fetch previous status points
//       console.log('The points in taskHandler looks like', points);

//   // fetch current status points
//   points = teamModel.fetchPoints(1, obj.status);
//   points[points.length - 1] += obj.points;
//   // increment current status points
//   teamModel.changePoints(1, obj.status, points);
// };





// module.exports.changeFeatureStatus = function (obj, res) {
//   // check current status
//   taskModel.getStatusById(obj.feature_id, res).then(
//     function (currentStatus){
//       console.log("we entered the first promise");
//       console.log('CurrentStatus looks like', currentStatus);
//       // fetch previous status points
//       teamModel.fetchPoints(1, currentStatus).then(
//         function (points) {
//           console.log('The points in taskHandler looks like', points);
//           points[points.length - 1] -= obj.points;
//           // decrement previous status points
//           teamModel.changePoints(1, currentStatus, points);
//         });
//     }).then(function () {
//       // change current status
//       taskModel.changeFeatureStatus(obj.feature_id, obj.status, res);
//       // fetch current status points
//       teamModel.fetchPoints(1, obj.status).then(
//         function (points) {
//           points[points.length - 1] += obj.points;
//           // increment current status points
//           teamModel.changePoints(1, obj.status, points);
//         });
//     })
// };

module.exports.changeFeaturePoints = function (obj, res) {
  taskModel.changeFeaturePoints(obj.feature_id, obj.points, res);
};

module.exports.changeFeatureDescription = function (obj, res) {
  taskModel.changeFeatureDescription(obj.feature_id, obj.description, res);
};

module.exports.changeFeatureName = function (obj, res) {
  taskModel.changeFeatureName(obj.feature_id, obj.name, res);
};

module.exports.changeFeatureUser = function (obj, res) {
  taskModel.changeFeatureUser(obj.feature_id, obj.user_id, res);
};

module.exports.getAllFeatures = function (team_id, res) {
  taskModel.getAllFeatures(team_id, res);
};

module.exports.getFeaturesByStatus = function (team_id, status, res) {
  taskModel.getFeaturesByStatus(team_id, status, res);
};

module.exports.getCommentsOnFeature = function (feature_id, res) {
  taskModel.getCommentsOnFeature(feature_id, res);
};

module.exports.changeTeamPoints = function (obj, res) {
  taskModel.changeTeamPoints(obj.team_id, obj.points, res);
};
