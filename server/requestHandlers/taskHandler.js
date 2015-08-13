var tasks = require('../models/taskModel.js');

module.exports.addFeature = function (feature, res) {
  // feature is {title, description, points, status[complete|inprogress|todo], sprint_id, team_id}
  tasks.addFeature(feature, res);
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  tasks.addCommentToFeature(comment, res);
};

module.exports.changeFeatureStatus = function (obj, res) {
  tasks.changeFeatureStatus(obj.feature_id, obj.status, res);
};

module.exports.changeFeaturePoints = function (obj, res) {
  tasks.changeFeaturePoints(obj.feature_id, obj.points, res);
};

module.exports.changeFeatureDescription = function (obj, res) {
  tasks.changeFeatureDescription(obj.feature_id, obj.description, res);
};

module.exports.changeFeatureTitle = function (obj, res) {
  tasks.changeFeatureTitle(obj.feature_id, obj.title, res);
};

module.exports.changeFeatureUser = function (obj, res) {
  tasks.changeFeatureUser(obj.feature_id, obj.user_id, res);
};

module.exports.getAllFeatures = function (sprint_id, res) {
  tasks.getAllFeatures(sprint_id, res);
};

module.exports.getFeaturesByStatus = function (sprint_id, status, res) {
  tasks.getFeaturesByStatus(sprint_id, status, res);
};

module.exports.getCommentsOnFeature = function (feature_id, res) {
  tasks.getCommentsOnFeature(feature_id, res);
};
