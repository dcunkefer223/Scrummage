angular.module('scrummage')
  .controller('navCtrl', ['$scope', 'myOffCanvas', function ($scope, myOffCanvas) {
    this.toggle = myOffCanvas.toggle;

    $scope.open = function() {
      $scope.showFeatureModal = true;
    };

    $scope.ok = function() {
      $scope.showFeatureModal = false;
    };

    $scope.cancel = function() {
      $scope.showFeatureModal = false;
    };
    
  }]);