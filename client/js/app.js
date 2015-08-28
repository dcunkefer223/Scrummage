angular.module('scrummage', [
  'ui.router',
  'ui.bootstrap',
  'dndLists',
  'ui.bootstrap.modal',
  'ngAnimate',
  'chart.js'
  ])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin')
  

  var appViews = ['signin', 'storyBoard','featureSetup', 'teamSetup', 'sprintSetup', 'settings', 'burndown', 'analytics', 'velocity'];
  appViews.forEach(function(stateName) {
    $stateProvider.state(stateName, {
      url: '/' + stateName.toLowerCase(),
      templateUrl: '/js/controllers/' + stateName + '/' + stateName + '.html',
      controller: stateName + 'Ctrl'
    })
  });
    // $stateProvider.state('analytics', {
    //   url: '/analytics',
    //   templateUrl: '/js/controllers/analytics/analytics.html',
    //   controller: 'analyticsCtrl', 
    //   views: {
    //     'burndown':{
    //       templateUrl: '/js/controllers/burndown/burndown.html',
    //       controller: 'burndownCtrl'
    //     },
    //     'velocity':{
    //       templateUrl: '/js/controllers/velocity/velocity.html',
    //       controller: 'velocityCtrl'
    //     },
    //   }//end of views
    // })
    // .state('burndown', {
    //   //parent: 'analytics',
    //   url: '/burndown',
    //   templateUrl: '/js/controllers/burndown/burndown.html',
    //   controller: 'burndownCtrl'
    // }).state('velocity', {
    //   //parent: 'analytics',
    //   url: '/velocity',
    //   templateUrl: '/js/controllers/velocity/velocity.html',
    //   controller: 'velocityCtrl'
    // });
});
