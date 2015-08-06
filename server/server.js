var express = require('express');
var app = express();

var db = require('./config/database.js');

var port = process.env.PORT || 3000;
var session = require('express-session');
var morgan = require('morgan');
var bodyParser = require('body-parser');
// var pg = require('pg');
// var configDB = require('./config/database.js');

// db.connect(db.url);
var passport = require('passport');
var flash = require('connect-flash');
// require('./app/routes.js')(app, passport);


app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({secret: 'anyString',
                saveUninitialized: true,
                resave: true}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// app.set('view engine', 'ejs');


// app.get('/', function (req, res) {
//   res.send('Hello ddpj!');
// });

app.use(express.static('./client/'));
app.listen(port);

console.log('Scrummage server running on port: ' + port);

