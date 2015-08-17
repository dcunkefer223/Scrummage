angular.module('scrummage')

  .controller('teamSetupCtrl', function($scope) {

    $scope.team = {
      name: null
    };

    $scope.newTeam = {
      name: null
    };

    $scope.open = function() {
      $scope.showModal = true;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };

  });