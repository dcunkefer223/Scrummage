angular.module('scrummage')

  .controller('analyticsCtrl', ['$scope', '$location', 'myOffCanvas', function ($scope, $location, myOffCanvas) {

  this.toggle = myOffCanvas.toggle;

  $scope.openBurndown = function () {
    $location.path('/burndown');
  };

  $scope.openVelocity = function () {
    $location.path('/velocity');
  };

  }]);// end of contr

