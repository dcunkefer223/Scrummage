angular.module('scrummage')
    .controller('storyBoardCtrl', function ($scope) {

      $scope.models = {
        selected: null,
        lists: {"todo": [], "progress": [], "complete": []}
      };

      $scope.addFeature = function () {
        $scope.models.lists.todo.push({label: "new thing"});
      }

      // Model to JSON
      $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
      }, true);


    });