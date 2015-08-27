angular.module('scrummageFeatureSetup', [])

.controller('featureSetupCtrl', function($scope){
  $scope.open = function() {
    $scope.showModal = true;
  };

  $scope.ok = function() {
    $scope.showModal = false;
  };

  $scope.cancel = function() {
    $scope.showModal = false;
  };

  $scope.isDisabled = false;
  $scope.disableClick = function() {
    if($scope.isDisabled === true) {
      $scope.isDisabled = false;
    } 
    else if($scope.isDisabled === false) {
      $scope.isDisabled = true;
    }
    return false;
  };

});