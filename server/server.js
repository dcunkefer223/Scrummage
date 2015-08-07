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

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anystringoftext',
         saveUninitialized: true,
         resave: true}));

app.use(express.static(__dirname + '/../client'));
app.use(passport.initialize());
app.use(passport.session());

routes(app);

app.listen(port);

console.log('Scrummage server running on port: ' + port);

 