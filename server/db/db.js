
var pg = require('pg');
var auth = process.env.DATABASE_URL ? null : require('../config/authStore.js');

//This sets up you connection to the database. if on heroku, it links to the postgres database URL they give us.
//Otherwise, it goes to the auth file and pulls it from there.

//*************************************
//Commenting out Paris settings to test
//*************************************

// var db = require('knex')({
//   client: 'pg',
//   connection: process.env.DATABASE_URL || auth.pgData
// });

var db = new pg.Client(process.env.DATABASE_URL || auth.pgData);
db.connect();


module.exports = db;

