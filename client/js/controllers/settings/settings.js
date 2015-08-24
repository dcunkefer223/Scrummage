angular.module('scrummage')

.controller('settingsCtrl', ['$scope', function ($scope){
  $scope.open = function() {
    $scope.showModal = true;
  };

  $scope.ok = function() {
    $scope.showModal = false;
  };

  $scope.cancel = function() {
    $scope.showModal = false;
  };

}]);