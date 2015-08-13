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

exports.pgData = {
      host: 'localhost',
      database: 'postgres',
      user : 'jansenfamily',
      port : 5432,
      password : '',
      ssl: false
    };
