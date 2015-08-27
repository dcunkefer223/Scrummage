
var pg = require('pg');
var auth = require('../config/authStore.js');

//This sets up you connection to the database. if on heroku, it links to the postgres database URL they give us.
//Otherwise, it goes to the auth file and pulls it from there.


// var db = require('knex')({
//   client: 'pg',
//   connection: process.env.DATABASE_URL || auth.pgData
// });


//This works
// var db = new pg.Client(auth.pgData);
// db.connect();

var db = require('knex')({
  client: 'pg',
  connection: {
    user: 'wtloxdvspmlazo',
    password: 'NSQw_qVzfiy4hTSwK3MYTxMEaB',
    host: 'ec2-54-83-55-214.compute-1.amazonaws.com',
    port: 5432,
    database: 'df8681a488cm7j',
    ssl: true
  }
  });


module.exports = db;

