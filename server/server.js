var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');
var routes = require('./app/routes.js');
var port = process.env.PORT || 3000;

// Our App Imports
var passportConfig = require('./config/passport.js')(passport);

// Initialize the instance of express
var app = express();

// Express Middleware Setup
app.use(session({
  secret: 'top...secret',
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + './client/'));
app.use(bodyParser.json());


// Writes all the routes to the server instance in the routes.js file
routes(app);
app.listen(port);

console.log('Scrummage server running on port: ' + port);

