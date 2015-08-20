angular.module('scrummage', [
  'ui.router',
  'ui.bootstrap',
  'dndLists',
  'ui.bootstrap.modal',
  'angularCharts',
  'ngAnimate'
  ])
.config(function ($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin')

  var appViews = ['signin', 'storyBoard', 'analytics', 'featureSetup', 'teamSetup', 'sprintSetup', 'settings']
  appViews.forEach(function(stateName) {
    $stateProvider.state(stateName, {
      url: '/' + stateName.toLowerCase(),
      templateUrl: '/js/controllers/' + stateName + '/' + stateName + '.html',
      controller: stateName + 'Ctrl'
    })
  });
});
