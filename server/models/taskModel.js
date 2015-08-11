var db = require('../db/db.js');

module.exports.addFeature = function (feature, res) {
  // feature is {title, description, points, status[complete|inprogress|todo], sprint_id, team_id}
  db('features').insert(feature).returning('id').then(
    function (id) {
      console.log('Feature inserted at id: ' + id);
      res.status(201).type('json').send({feature_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to insert feature into database');
    }
  );
};

module.exports.changeFeatureStatus = function (feature_id, newStatus) {
  db('features').where(id, feature_id).update(status, newStatus).then(
    function (features) {
      return true;
    }, 
    function (error) {
      console.error(error);
      return false;
    }
  );
};

module.exports.getAllFeatures = function (sprint_id) {
  db.select('*').from('features').where('sprint_id', sprint_id).then(
    function (features) {
      return features;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getCompleteFeatures = function (sprint_id) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'complete'}).then(
    function (features) {
      return features;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getInProgressFeatures = function (sprint_id) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'inprogress'}).then(
    function (features) {
      return features;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getToDoFeatures = function (sprint_id) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'todo'}).then(
    function (features) {
      return features;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getFeaturesByStatus = function (sprint_id, status) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: status}).then(
    function (features) {
      return features;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getCommentsOnFeature = function (feature_id) {
  db.select('*').from('comments').where('feature_id', feature_id).then(
    function (comments) {
      return comments;
    }, 
    function (error) {
      console.error(error);
    }
  );
};
