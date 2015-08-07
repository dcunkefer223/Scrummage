//userModel.js
var db = require('../db/db.js').db;

exports.addUser = function(user, cb){
   console.log("inside addUser", user);
  // addFacebookUser : insert a new user row. Called by Passport.js
  var queryString = "INSERT INTO users (twitter_id, google_id, facebook_id, picture, gender, username) VALUES ("
                     + "'" + user.github_id + "', "
                     + "'" + user.username + "') RETURNING id;";

  console.log('queryString: ', queryString)
  db.query(queryString, function(err, results){
    console.log("Inside the POST Query callback");
    console.log(err, results);
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};

exports.findUserByGithubId = function(id, cb){

  console.log('Inside the users find query');
  var queryString = "SELECT * FROM users WHERE github_id = " + "'" + id + "';";
  db.query(queryString, function(err, results){
    // console.log('findUser: ', results)
    err ? cb(err, null) : cb(null, results.rows[0]);
  });
};
