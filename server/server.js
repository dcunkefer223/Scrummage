var express = require('express');
var app = express();
var db = require('./config/database.js');

app.get('/', function (req, res) {
  res.send('Hello ddpj!');
});

var port = 3000;
app.listen(port);

console.log('Scrummage server running on port: ' + port);

