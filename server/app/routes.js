var User = require('./models/user');
module.exports = function(app, passport){
  app.get('/', function(req, res){
    res.render('index.ejs');
  });

  app.get('/login', function(req, res){
    res.render('login.ejs', { message: req.flash('loginMessage') });
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/signup', function(req, res){
    res.render('signup.ejs', { message: req.flash('signupMessage') });
  });


  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/login',
    failureRedirect: '/signup',
    failureFlash: true
  }));


  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/login');
  })
};

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}
