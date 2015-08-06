var pg = require('pg');
var auth = require('../config/auth.js');

//This sets up you connection to the database. if on heroku, it links to the postgres database URL they give us.
//Otherwise, it goes to the auth file and pulls it from there.
var db = require('knex')({
  client: 'pg',
  connection: (process.env.DATABASE_URL || auth.pgData)
});


module.exports = db;