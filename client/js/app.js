angular.module('scrummage', [
  'ui.router',
  'ui.bootstrap'
  ])
.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/signin')

  var appViews = ['signin', 'settings', 'taskTable']
  appViews.forEach(function(stateName) {
    $stateProvider.state(stateName, {
      url: '/' + stateName.toLowerCase(),
      templateUrl: '/js/controllers/' + stateName + '/' + stateName + '.html',
      controller: stateName + 'Ctrl'
    })
  })
});