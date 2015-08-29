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
});
