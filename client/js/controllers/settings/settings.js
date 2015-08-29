angular.module('scrummage')

.controller('settingsCtrl', ['$scope', 'Request', '$location', '$rootScope', function ($scope, Request, $location, $rootScope){
  $scope.open = function() {
    $rootScope.showSettingsModal = true;
  };

  $scope.ok = function() {
    $rootScope.showsettingsModal = false;
  };

  $scope.cancel = function() {
    $rootScope.showSettingsModal = false;
  };

  $scope.leaveTeam = function () {
    Request.user.leaveTeam();
    $location.path('/teamsetup');
  };

}]);