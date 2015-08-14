var db = require('../db/db.js');
var Promise = require('bluebird');

module.exports.addFeature = function (feature, res) {
  // feature is {title, description, points, status[complete|inprogress|todo], team_id}
  db('features').insert(feature).returning('id').then(
    function (id) {
      console.log('Feature inserted at id: ' + id);
      res.status(201).send({feature_id: id[0]});
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
      res.status(201).send({comment_id: id[0]});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to insert comment into database');
    }
  );
};

module.exports.changeFeatureStatus = function (feature_id, newStatus, res) {
  db('features').where('id', feature_id).update('status', newStatus).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeaturePoints = function (feature_id, newPoints, res) {
  db('features').where('id', feature_id).update('points', newPoints).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureDescription = function (feature_id, newDesc, res) {
  db('features').where('id', feature_id).update('description', newDesc).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureName = function (feature_id, newName, res) {
  db('features').where('id', feature_id).update('name', newName).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureUser = function (feature_id, user_id, res) {
  db('features').where('id', feature_id).update('team_id', user_id).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.getAllFeatures = function (team_id, res) {
  db.select('*').from('features').where('team_id', team_id).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getCompleteFeatures = function (team_id, res) {
  db.select('*').from('features').where({team_id: team_id, status: 'complete'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getInProgressFeatures = function (team_id, res) {
  db.select('*').from('features').where({team_id: team_id, status: 'inprogress'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getToDoFeatures = function (team_id, res) {
  db.select('*').from('features').where({team_id: team_id, status: 'todo'}).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.getFeaturesByStatus = function (team_id, status, res) {
  db.select('*').from('features').where({team_id: team_id, status: status}).then(
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
  db.select('*').from('comments').where('id', feature_id).then(
    function (comments) {
      res.status(200).send(comments);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.changeTeamPoints = function (team_id, newPoints, res) {
  db('teams').where('id', team_id).update('points', newPoints).then(
    function (rows) {
      res.status(200).send({team_id: team_id, points: newPoints});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.getStatusById = function (feature_id) {
  return db.select('status').from('features').where('id', feature_id)
    // function (status) {
    //   return status[0].status;
    // },
    // function (error) {
    //   console.error(error);
    
  
};







