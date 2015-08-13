
var pg = require('pg');
var auth = require('../config/authStore.js');

//This sets up you connection to the database. if on heroku, it links to the postgres database URL they give us.
//Otherwise, it goes to the auth file and pulls it from there.

//*************************************
//Commenting out Paris settings to test
//*************************************

// var db = require('knex')({
//   client: 'pg',
//   connection: process.env.DATABASE_URL || auth.pgData
// });

var db = require('knex')({
  client: 'pg',
  connection: process.env.DATABASE_URL || auth.pgData,
  // database: 'df8681a488cm7j',
  user : process.env.DATABASE_user || auth.pgData.user,
  port : process.env.DATABASE_port || auth.pgData.port,
  password : process.env.DATABASE_password || auth.pgData.password,
  ssl: true
})

// var db = new pg.Client("");
// db.connect();


module.exports = db;

