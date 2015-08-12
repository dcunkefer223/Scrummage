angular.module('scrummage')

.controller('analyticsCtrl', function($scope){
  $scope.open = function() {
    console.log("analysticCtrl OPEN");
    $scope.showModal = true;
  };

  $scope.ok = function() {
    $scope.showModal = false;
  };

  $scope.cancel = function() {
    $scope.showModal = false;
  };
});

