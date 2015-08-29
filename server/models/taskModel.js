var db = require('../db/db.js');

module.exports.addFeature = function (feature, res) {
  // feature is {title, description, points, status[complete|inprogress|todo], team_id}
  return db('features').insert(feature).returning('id');
};

module.exports.addCommentToFeature = function (comment) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  return db('comments').insert(comment).returning('id');
};

module.exports.changeFeatureStatus = function (feature_id, newStatus, currentDate, res) {
  return db('features').where('id', feature_id).update({status : newStatus, status_date : currentDate}).returning('*');
};

module.exports.changeFeaturePoints = function (feature_id, newPoints) {
  return db('features').where('id', feature_id).update('points', newPoints);
};

module.exports.changeFeatureDescription = function (feature_id, newDesc) {
  return db('features').where('id', feature_id).update('description', newDesc);
};

module.exports.changeFeatureName = function (feature_id, newName) {
  return db('features').where('id', feature_id).update('name', newName);
};

module.exports.changeFeatureUser = function (feature_id, user_id) {
  return db('features').where('id', feature_id).update('team_id', user_id);
};

module.exports.getAllFeatures = function (team_id) {
  return db.select('*').from('features').where('team_id', team_id);
};

module.exports.getFeaturesByStatus = function (team_id, status) {
  return db.select('*').from('features').where({team_id: team_id, status: status});
};

module.exports.getCommentsOnFeature = function (feature_id, res) {
  return db.select('*').from('comments').where('id', feature_id);
};

module.exports.changeTeamPoints = function (team_id, newPoints) {
  return db('teams').where('id', team_id).update('points', newPoints);
};

module.exports.getStatusById = function (feature_id) {
  return db.select('status').from('features').where('id', feature_id);
};







