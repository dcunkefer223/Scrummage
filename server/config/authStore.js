var passport = require('passport');

exports.authorizeForAPI = function(req, res, next){
    if(!req.isAuthenticated()) {
      res.sendStatus(403);
    } else {
      next();
    }
  };

exports.checkUser = function(req, res, next){
  if (!req.isAuthenticated()){
    return res.json({permission: false});
  } else {
    return res.json({permission: true});
  }
};

// Paris
exports.pgData = {
      host: 'localhost',
      database: 'postgres',
      user : 'postgres',
      port : 5432,
      password : '',
      ssl: false
    };

// Daniel
// exports.pgData = {
//       host: 'localhost',
//       database: 'jansenfamily',
//       user : 'jansenfamily',
//       port : 5432,
//       password : '',
//       ssl: false
//     };

// Dave
// exports.pgData = {
//       host: 'localhost',
//       database: 'postgres',
//       user : 'davidunkefer',
//       port : 5432,
//       password : '',
//       ssl: false
//     };

