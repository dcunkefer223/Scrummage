angular.module('scrummage')

.controller('settingsCtrl', ['$scope', 'Request', '$location', function ($scope, Request, $location){
  
  $scope.open = function() {
    $scope.showModal = true;
  };

  $scope.ok = function() {
    $scope.showModal = false;
  };

  $scope.cancel = function() {
    $scope.showModal = false;
  };

  $scope.leaveTeam = function () {
    Request.user.leaveTeam();
    $location.path('/teamsetup');
  };

}]);