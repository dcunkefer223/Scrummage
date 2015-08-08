var db = require('../db/db.js');

module.exports.addTask = function (task) {
  // task is {title, description, points, status, sprint_id, user_id}
  var testKeys = Object.keys(task).sort();
  if (testKeys !== ['description', 'points', 'sprint_id', 'status', 'title', 'user_id']) {
    return false;
  }
  db("features").insert(task).returning('id').then(
    function (id) {
      console.log('Task inserted at id: ' + id);
      return true;
    }, 
    function (error) {
      console.error(error);
      return false;
    }
  );
};

module.exports.getAllTasks = function (sprint_id) {
  db.select('*').from('features').where('sprint_id', sprint_id).then(
    function (tasks) {
      return tasks;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getCompleteTasks = function (sprint_id) {};

module.exports.getInProgressTasks = function (sprint_id) {};

module.exports.getToDoTasks = function (sprint_id) {};

module.exports.getCommentsOnTask = function(feature_id){};
