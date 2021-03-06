var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var routes = require(__dirname + '/routes.js');
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

require('./config/passport')(passport);

app.use(bodyParser.json());

// This function is important, it handles the error
// created when bodyParser recieves invalid JSON
app.use(function (err, req, res, next) {
  if(err) {
    console.error(err);
    res.status(400).send('Invalid JSON request');
  } else {
    next();
  }
});

app.use(session({secret: 'anystringoftext',
         saveUninitialized: true,
         resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/../client'));
// app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

routes(app);

app.listen(port);

console.log('Scrummage server running on port: ' + port);


