var tasks = require('../models/taskModel.js');

module.exports.addFeature = function (feature) {
	// feature is {title, description, points, status[complete|inprogress|todo], sprint_id, user_id}
	tasks.addFeature(feature);
};

module.exports.getAllFeatures = function (sprint_id) {
	tasks.getAllFeatures(sprint_id);
};

module.exports.getFeaturesByStatus = function (sprint_id, status) {
	tasks.getFeaturesByStatus(sprint_id, status);
};

module.exports.getCommentsOnFeature = function (feature_id) {
	tasks.getCommentsOnFeature(feature_id);
};