angular.module('scrummage')

  .controller('teamSetupCtrl', function ($scope, Request, $location) {

    $scope.team = {
      name: null
    };

    $scope.newTeam = {
      name: null
    };

    $scope.changeTeam = function (newTeam) {
      Request.user.joinTeam(newTeam);
      $location.path('/storyboard');
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