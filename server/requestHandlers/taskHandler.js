var taskModel = require('../models/taskModel.js');

module.exports.addFeature = function (feature, res) {
  // feature is {title, description, points, status[complete|inprogress|todo], sprint_id, team_id}
  taskModel.addFeature(feature, res);
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  taskModel.addCommentToFeature(comment, res);
};

module.exports.changeFeatureStatus = function (obj, res) {
  taskModel.changeFeatureStatus(obj.feature_id, obj.newStatus, res);
};

module.exports.changeFeaturePoints = function (obj, res) {
  taskModel.changeFeaturePoints(obj.feature_id, obj.newPoints, res);
};

module.exports.changeFeatureDescription = function (obj, res) {
  taskModel.changeFeatureDescription(obj.feature_id, obj.newDesc, res);
};

module.exports.changeFeatureTitle = function (obj, res) {
  taskModel.changeFeatureTitle(obj.feature_id, obj.newTitle, res);
};

module.exports.changeFeatureUser = function (obj, res) {
  taskModel.changeFeatureUser(obj.feature_id, obj.user_id, res);
};

module.exports.getAllFeatures = function (sprint_id, res) {
  taskModel.getAllFeatures(sprint_id, res);
};

module.exports.getFeaturesByStatus = function (sprint_id, status, res) {
  taskModel.getFeaturesByStatus(sprint_id, status, res);
};

module.exports.getCommentsOnFeature = function (feature_id, res) {
  taskModel.getCommentsOnFeature(feature_id, res);
};
