var db = require('../db/db.js');

module.exports.addTask = function (task) {
  // task is {title, description, points, status[complete|inprogress|todo], sprint_id, user_id}
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

module.exports.getCompleteTasks = function (sprint_id) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'complete'}).then(
    function (tasks) {
      return tasks;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getInProgressTasks = function (sprint_id) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'inprogress'}).then(
    function (tasks) {
      return tasks;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getToDoTasks = function (sprint_id) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: 'todo'}).then(
    function (tasks) {
      return tasks;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getTasksByStatus = function (sprint_id, status) {
  db.select('*').from('features').where({sprint_id: sprint_id, status: status}).then(
    function (tasks) {
      return tasks;
    }, 
    function (error) {
      console.error(error);
    }
  );
};

module.exports.getCommentsOnTask = function (feature_id) {
  db.select('*').from('comments').where('feature_id', feature_id).then(
    function (comments) {
      return comments;
    }, 
    function (error) {
      console.error(error);
    }
  );
};
