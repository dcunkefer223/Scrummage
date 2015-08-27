angular.module('scrummage')

  .controller('analyticsCtrl', ['$scope', '$location', function ($scope, $location) {

  $scope.openBurndown = function () {
    $location.path('/burndown');
  };

  $scope.openVelocity = function () {
    $location.path('/velocity');
  };

  }]);// end of contr

