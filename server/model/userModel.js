//userModel.js
var db = require('../db/db.js');

exports.addUser = function(user, cb){
   console.log("inside addUser", user);
  // addFacebookUser : insert a new user row. Called by Passport.js
  var queryString = "INSERT INTO users (githubid, picture, gender, username) VALUES ("
                     + "'" + user.github_id + "', "
                     + "'" + user.username + "') RETURNING id;";

  console.log('queryString: ', queryString);
  db('users').insert({email: user.email, username: user.username, github_id: user.github_id}).then(function(){
    console.log("user inserted");
  })
  //knex('books').insert({title: 'Slaughterhouse Five'})
  //insert into `books` (`title`) values ('Slaughterhouse Five')
//   CREATE TABLE users (
//   id SERIAL PRIMARY KEY,
//   email VARCHAR,
//   username VARCHAR,
//   password VARCHAR,
//   github_id VARCHAR
// );



  // db.query(queryString, function(err, results){
  //   console.log("Inside the POST Query callback");
  //   console.log(err, results);
  //   err ? cb(err, null) : cb(null, results.rows[0]);
  // });
};

exports.findUserByGithubId = function(id, cb){

  console.log('Inside the users find query');
  // var queryString = "SELECT * FROM users WHERE github_id = " + "'" + id + "';";
  db.select('*').from('users').where('github_id', id).then(function(user){
    // err ? cb(err, null) : cb(null, results.rows[0]);
    cb(null, user[0]);
  });

  // db.query(queryString, function(err, results){
  //   // console.log('findUser: ', results)

  // });
};
