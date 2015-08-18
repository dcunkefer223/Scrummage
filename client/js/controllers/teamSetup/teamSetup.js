angular.module('scrummage')

  .controller('teamSetupCtrl', function ($scope, Request, $location) {

    $scope.team = {
      name: null
    };

    $scope.newTeam = {
      name: null
    };

    $scope.changeTeam = function (team) {
      Request.user.joinTeam(team);
      $location.path('/storyboard');
    };

    $scope.createTeam = function (newTeam) {
      Request.user.createTeam(newTeam);
      $location.path('/storyboard');
    };

  });