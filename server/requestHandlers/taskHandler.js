var taskModel = require('../models/taskModel.js');
var teamModel = require('../models/teamModel.js');

module.exports.addFeature = function (feature, user, res) {
  // feature is {name, description, points, status[complete|progress|backlog], team_id}
  var points;
  var featureId;
  var currentDate = new Date();
  currentDate = currentDate.toDateString();
  taskModel.addFeature({ name: feature.name, 
                         description: feature.description,
                         points: feature.points,
                         status: feature.status,
                         status_date : currentDate,
                         team_id: user.current_team,
                         user_id: user.id }, res)
    .then(function (id) {
      featureId = id[0];
      // fetch backlog points
      return teamModel.fetchCurrentPoints(user.current_team);
    })
    .then(function (team){
      // increment backlog points
      points = team[0][feature.status];
      points += parseInt(feature.points, 10);
      // update backlog points          
      return teamModel.changeCurrentPoints(user.current_team, feature.status, points);
    })
    .then(function (team) {
      return teamModel.fetchCurrentPoints(team[0].id);
    })
    .then(function (response) {
      console.log('Response in taskHandler looks like', response);
      res.status(201).send({team : response[0], 
                            feature_id: featureId, 
                            feature_date: currentDate});
    })
    .catch(function (error) {
      console.error(error);
      res.status(500).send('Error while inserting feature into database');
    });
};

module.exports.addCommentToFeature = function (comment, res) {
  // comment is {comment(the text), posted(TIMESTAMP), feature_id, user_id}
  taskModel.addCommentToFeature(comment).then(
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

module.exports.changeFeatureStatus = function (obj, user, res) {
  // check current status
  var points;
  var feature;
  var currentStatus;
  var currentDate = new Date();
  currentDate = currentDate.toDateString();
  // console.log('the user looks like', user);

  taskModel.getStatusById(obj.feature_id)
    .then(function (oldStatus) {
      currentStatus = oldStatus[0].status;
      return teamModel.fetchCurrentPoints(user.current_team);
    })
    .then(function (team) {
      points = team[0][currentStatus];
      // decrement previous status points
      points -= parseInt(obj.points, 10);
      return teamModel.changeCurrentPoints(user.current_team, currentStatus, points);
    })
    .then(function () {
      // change current status
      return taskModel.changeFeatureStatus(obj.feature_id, obj.status, currentDate, res);
    })
    .then(function (newFeature) {
      feature = newFeature;
      return teamModel.fetchCurrentPoints(user.current_team);
    })
    .then(function (team) {
      currentStatus = obj.status;
      points = team[0][currentStatus];
      // increment current status points
      points += parseInt(obj.points, 10);
      // console.log(fetchedPoints[0]);
      return teamModel.changeCurrentPoints(user.current_team, currentStatus, points);
    })
    .then(function (resp) {
      res.status(200).send({team: resp, feature: feature});
    })
    .catch(function (error) {
      console.error(error);
    });
};


module.exports.changeFeaturePoints = function (obj, res) {
  taskModel.changeFeaturePoints(obj.feature_id, obj.points).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureDescription = function (obj, res) {
  taskModel.changeFeatureDescription(obj.feature_id, obj.description).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureName = function (obj, res) {
  taskModel.changeFeatureName(obj.feature_id, obj.name).then(
    function (rows) {
      res.status(200).send({feature_id: feature_id});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

module.exports.changeFeatureUser = function (obj, res) {
  taskModel.changeFeatureUser(obj.feature_id, obj.user_id).then(
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
  taskModel.getAllFeatures(team_id).then(
    function (features) {
      res.status(200).send(features);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find requested resource in database');
    }
  );
};

module.exports.getFeaturesByStatus = function (team_id, status, res) {
  taskModel.getFeaturesByStatus(team_id, status).then(
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
  taskModel.getCommentsOnFeature(feature_id).then(
    function (comments) {
      res.status(200).send(comments);
    }, 
    function (error) {
      console.error(error);
      res.status(404).send('Failed to find request resource in database');
    }
  );
};

module.exports.changeTeamPoints = function (obj, res) {
  taskModel.changeTeamPoints(obj.team_id, obj.points).then(
    function (rows) {
      res.status(200).send({team_id: team_id, points: newPoints});
    }, 
    function (error) {
      console.error(error);
      res.status(500).send('Failed to update feature in database');
    }
  );
};

