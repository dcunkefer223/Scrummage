var db = require('../db/db.js');

module.exports.addFeature = function (feature, res) {
  // feature is {title, description, points, status[complete|inprogress|todo], sprint_id, team_id}
  db('features').insert(feature).returning('id').then(
    function (id) {
      console.log('Feature inserted at id: ' + id);
      res.status(201).send({feature_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to insert feature into database');
    }
  );
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  db('comments').insert(comment).returning('id').then(
    function (id) {
      console.log('Comment inserted at id: ' + id);
      res.status(201).send({comment_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to insert comment into database');
    }
  );
};

module.exports.changeFeatureStatus = function (feature_id, newStatus, res) {
  db('features').where(id, feature_id).update(status, newStatus).then(
    function (rows) {
      res.status(200).send({feature_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeaturePoints = function (feature_id, newPoints, res) {
  db('features').where(id, feature_id).update(points, newPoints).then(
    function (rows) {
      res.status(200).send({feature_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureDescription = function (feature_id, newDesc, res) {
  db('features').where(id, feature_id).update(description, newDesc).then(
    function (rows) {
      res.status(200).send({feature_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureTitle = function (feature_id, newTitle, res) {
  db('features').where(id, feature_id).update(title, newTitle).then(
    function (rows) {
      res.status(200).send({feature_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureTeam = function (feature_id, newTeam_id, res) {
  db('features').where(id, feature_id).update(team_id, newTeam_id).then(
    function (rows) {
      res.status(200).send({feature_id: id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.getAllFeatures = function (sprint_id, res) {
  db.select('*').from('features').where('sprint_id', sprint_id).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getCompleteFeatures = function (sprint_id, res) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'complete'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getInProgressFeatures = function (sprint_id, res) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'inprogress'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getToDoFeatures = function (sprint_id, res) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'todo'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getFeaturesByStatus = function (sprint_id, status, res) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: status}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getCommentsOnFeature = function (feature_id, res) {
  db.select('*').from('comments').where('feature_id', feature_id).then(
    function (comments) {
      res.status(200).send(comments);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

