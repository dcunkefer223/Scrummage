angular.module('storyBoard', ['dndLists'])
    .controller('mainCtrl', function ($scope) {

      $scope.models = {
        selected: null,
        lists: {"todo": [], "progress": [], "complete": []}
      };

      // Generate initial model
      for (var i = 1; i <= 3; i++) {
        $scope.models.lists.todo.push({label: "Task 1" + i});
        $scope.models.lists.progress.push({label: "Task 2" + i});
      }

      // Model to JSON
      $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
      }, true);

    });