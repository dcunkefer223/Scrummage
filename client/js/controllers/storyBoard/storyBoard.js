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
        sprint_id: 1,
        name: "",
        description: "",
        points: 0,
        status: "backlog"
      };

      $scope.clearBoard = function () {
        for(var prop in $scope.models.lists) {
          prop.length = 0;
        }
      };

      $scope.renderBoard = function () {
        Request.feature.fetchAll.then(function (results) {
          $scope.clearBoard();
          for(var i = 0; i < results.length; i++) {
            for(var key in $scope.models.lists) {
              if(results[i][status] === key) {
                $scope.models.lists[key].push(results[i]);
              }
            }
          }
        });        
      };

      setInterval($scope.renderBoard, 1000);

      $scope.dropCallback = function (event, index, item, external, listName) {
        item.status = listName;
        item.points = parseInt(item.points);
        if(listName === "complete") {
          //Request.analytics.substractPoints(item);
        }
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
        //Request.feature.create(newFeature).then(function () {

        //});
        //Request.analytics.addPoints().then(function () {

        //});
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
