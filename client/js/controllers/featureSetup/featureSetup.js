angular.module('scrummage')

.controller('featureSetupCtrl', ['$scope', '$rootScope', function ($scope, $rootScope){
  $scope.open = function() {
    $rootScope.showFeatureModal = true;
  };

  $scope.ok = function() {
    $rootScope.showFeatureModal = false;
  };

  $scope.cancel = function() {
    $rootScope.showFeatureModal = false;
  };

}]);