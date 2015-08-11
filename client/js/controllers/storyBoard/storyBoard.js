angular.module('scrummage')
    .controller('storyBoardCtrl', function ($scope) {

      $scope.models = {
        selected: null,
        lists: {
          "todo": [], 
          "progress": [], 
          "complete": []
        }
      };

      $scope.feature = {
        name: "",
        description: "",
        points: 0,
        status: "todo"
      };

      // use dnd callback to updateStatus() on drag event

      $scope.addFeature = function (newFeature) {
        $scope.models.lists.todo.unshift(newFeature);

        $scope.feature = {
          name: "",
          description: "",
          points: 0,
          status: "todo"
        };
      };

      $scope.submitFeature = function () {
        console.log($scope.models.lists);
        console.log($scope.feature);
      };

      // Model to JSON
      $scope.$watch('models', function(model) {
        $scope.modelAsJson = angular.toJson(model, true);
      }, true);

    })
    .filter('capitalize', function() {
        return function(input) {
          return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
        }
    });