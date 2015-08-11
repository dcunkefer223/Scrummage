var tasks = require('../models/taskModel.js');

module.exports.addFeature = function (feature, res) {
	// feature is {title, description, points, status[complete|inprogress|todo], sprint_id, team_id}
	tasks.addFeature(feature, res);
};

module.exports.changeFeatureStatus = function (obj, res) {
	tasks.getAllFeatures(obj.feature_id, obj.newStatus, res);
};

module.exports.getAllFeatures = function (obj, res) {
	tasks.getAllFeatures(obj.sprint_id, res);
};

module.exports.getFeaturesByStatus = function (obj, res) {
	tasks.getFeaturesByStatus(obj.sprint_id, obj.status, res);
};

module.exports.getCommentsOnFeature = function (obj, res) {
	tasks.getCommentsOnFeature(obj.feature_id, res);
};
