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
// exports.pgData = {
//       host: 'localhost',
//       database: 'postgres',
//       user : 'postgres',
//       port : 5432,
//       password : 'ryuoko',
//       ssl: false
//     };

// Daniel
exports.pgData = {
      host: 'ec2-54-83-55-214.compute-1.amazonaws.com',
      database: 'df8681a488cm7j',
      user : 'wtloxdvspmlazo',
      port : 5432,
      password : 'NSQw_qVzfiy4hTSwK3MYTxMEaB',
      ssl: true
    };

// Dave
// exports.pgData = {
//       host: 'localhost',
//       database: 'postgres',
//       user : 'davidunkefer',
//       port : 5432,
//       password : '',
//       ssl: false
//     };


