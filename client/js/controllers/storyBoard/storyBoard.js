angular.module('scrummage')
    .controller('storyBoardCtrl', function ($scope) {

      $scope.models = {
        selected: null,
        lists: {
          "backlog":  [], 
          "progress": [], 
          "complete": []
        }
      };

      $scope.feature = {
        name: "",
        description: "",
        points: 0,
        status: "backlog"
      };

      $scope.dropCallback = function (event, index, item, external, listName) {
        item.status = listName;
        return item;
      };

      $scope.addFeature = function (newFeature) {
        $scope.models.lists.backlog.unshift(newFeature);

        $scope.feature = {
          name: "",
          description: "",
          points: 0,
          status: "backlog"
        };
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
