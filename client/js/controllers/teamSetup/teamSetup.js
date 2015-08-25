angular.module('scrummage')

  .controller('teamSetupCtrl', ['$scope', 'Request', '$location', function ($scope, Request, $location) {

    $scope.team = {
      name: null
    };

    $scope.newTeam = {
      name: null,
      date: Date.now()
    };

    $scope.changeTeam = function (team) {
      Request.user.joinTeam(team).then(
        function () {
          return Request.analytics.getSprintHistory();
        });
      // if not worked, promise
      // if not worked, put into renderBoard()
      $location.path('/storyboard');
    };

    $scope.createTeam = function (newTeam) {
      Request.user.createTeam(newTeam);
      $location.path('/sprintsetup');
    };

  }]);