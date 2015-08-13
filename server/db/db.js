
var pg = require('pg');
// var auth = process.env.DATABASE_URL ? null : require('../config/authStore.js');

//This sets up you connection to the database. if on heroku, it links to the postgres database URL they give us.
//Otherwise, it goes to the auth file and pulls it from there.



var db = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL,// || auth.pgData,
  connection: process.env.DATABASE_user,// || auth.pgData,
  connection: process.env.DATABASE_database,// || auth.pgData,
  connection: process.env.DATABASE_password// || auth.pgData

});

// var db = new pg.Client("");
// db.connect();


module.exports = db;

