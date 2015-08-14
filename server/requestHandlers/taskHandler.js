var taskModel = require('../models/taskModel.js');
var teamModel = require('../models/teamModel.js');

module.exports.addFeature = function (feature, res) {
  // feature is {name, description, points, status[complete|progress|backlog], team_id}
  taskModel.addFeature(feature, res)
    .then(function (id) {
      // fetch backlog points
      teamModel.fetchPoints(1, feature.status)
        .then(function (response){
        // increment backlog points
        var points = JSON.parse(response[0][feature.status]);
        points[points.length - 1] += parseInt(feature.points, 10);

        // update backlog points          
        teamModel.changePoints(1, feature.status, points)
          .then(function (response) {
            console.log('Feature inserted at id: ' + id);
            res.status(201).send({feature_id: id[0]});
          },
            function (error) {
              console.error(error);
              res.status(500).send('Failed to insert feature into database');
            });
        });
    });
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
    .then( function (oldStatus) {
      currentStatus = oldStatus[0].status;
      teamModel.fetchPoints(1, currentStatus)
        .then(function (fetchedPoints) {
          points = JSON.parse(fetchedPoints[0][currentStatus]);
          // decrement previous status points
          points[points.length - 1] -= parseInt(obj.points, 10);
          teamModel.changePoints(1, currentStatus, points)
            .then(function () {
              // change current status
              taskModel.changeFeatureStatus(obj.feature_id, obj.status, res)
                .then(function () {
                  currentStatus = obj.status
                  teamModel.fetchPoints(1, currentStatus)
                    .then(function (fetchedPoints) {
                      points = JSON.parse(fetchedPoints[0][currentStatus]);
                      // increment current status points
                      points[points.length - 1] += parseInt(obj.points, 10);
                      teamModel.changePoints(1, currentStatus, points)
                        .then(
                          function () {
                          res.status(200).send({feature_id: obj.feature_id});
                        },
                          function (error) {
                            console.error(error);
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};

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
