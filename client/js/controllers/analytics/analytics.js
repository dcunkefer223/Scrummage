angular.module('scrummage')

  .controller('analyticsCtrl', function ($scope, $location, Request){

  $scope.openBurndown = function () {
    $location.path('/burndown');
  };

  $scope.openVelocity = function () {
    // $location.path('/velocity');
  };

  });// end of contr

