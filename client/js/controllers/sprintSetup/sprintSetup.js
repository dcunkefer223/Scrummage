angular.module('scrummage')

  .controller('sprintSetupCtrl', function ($scope, Request, $location) {

    $scope.newSprint = {
      name : '',
      sprintstart: '',
      sprintend: ''
    };

    $scope.createSprint = function (newSprint) {
      // Request.sprint.createSprint(newSprint);
      $location.path('/storyboard');
      // console.log(newSprint);
    };

  });