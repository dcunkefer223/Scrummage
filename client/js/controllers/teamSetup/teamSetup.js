angular.module('scrummage')

  .controller('teamSetupCtrl', ['$scope', 'Request', '$location', 'InitializeAnalytics', function ($scope, Request, $location, InitializeAnalytics) {

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
        })
        .then(function (data) {
          InitializeAnalytics.setData(data);
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