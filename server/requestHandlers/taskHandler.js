var taskModel = require('../models/taskModel.js');
var teamModel = require('../models/teamModel.js');

module.exports.addFeature = function (feature, user, res) {
  // feature is {name, description, points, status[complete|progress|backlog], team_id}
  var points;
  var featureId;

  taskModel.addFeature({ name: feature.name, 
                         description: feature.description,
                         points: feature.points,
                         status: feature.status,
                         team_id: user.current_team,
                         user_id: user.id }, res)
    .then(function (id) {
      featureId = id[0];
      // fetch backlog points
      return teamModel.fetchCurrentPoints(user.current_team, feature.status);
    })
    .then(function (fetchedPoints){
      // increment backlog points
      points = fetchedPoints[0][feature.status];
      points += parseInt(feature.points, 10);
      // update backlog points          
      return teamModel.changeCurrentPoints(user.current_team, feature.status, points);
    })
    .then(function (response) {
      console.log('Feature inserted at id: ' + featureId);
      res.status(201).send({feature_id: featureId});
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error while inserting feature into database');
    });
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  taskModel.addCommentToFeature(comment, res);
};

module.exports.changeFeatureStatus = function (obj, user, res) {
  // check current status
  var points;
  var currentStatus;
  console.log('the user looks like', user);

  taskModel.getStatusById(obj.feature_id)
    .then(function (oldStatus) {
      currentStatus = oldStatus[0].status;
      return teamModel.fetchCurrentPoints(user.current_team, currentStatus);
    })
    .then(function (fetchedPoints) {
      points = fetchedPoints[0][currentStatus];
      // decrement previous status points
      points -= parseInt(obj.points, 10);
      return teamModel.changeCurrentPoints(user.current_team, currentStatus, points);
    })
    .then(function () {
      // change current status
      return taskModel.changeFeatureStatus(obj.feature_id, obj.status, res);
    })
    .then(function () {
      currentStatus = obj.status;
      return teamModel.fetchCurrentPoints(user.current_team, currentStatus);
    })
    .then(function (fetchedPoints) {
      points = fetchedPoints[0][currentStatus];
      // increment current status points
      points += parseInt(obj.points, 10);
      return teamModel.changeCurrentPoints(user.current_team, currentStatus, points);
    })
    .then(function () {
      res.status(200).send({feature_id: obj.feature_id});
    })
    .catch(function (error) {
      console.error(error);
    });
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
