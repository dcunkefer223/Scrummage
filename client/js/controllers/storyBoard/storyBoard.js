angular.module('scrummage')
    .controller('storyBoardCtrl', function ($scope, Request) {

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
          $scope.models.lists[prop].length = 0;
        }
      };

      $scope.renderBoard = function () {
        Request.feature.fetchAll().then(function (results) {
          console.log(results);
          $scope.clearBoard();
          for(var i = 0; i < results.length; i++) {
            for(var key in $scope.models.lists) {
              if(results[i].status === key) {
                $scope.models.lists[key].push(results[i]);
              }
            }
          }
          console.log($scope.models.lists);
        });
      };

      // setInterval($scope.renderBoard, 1000);

      $scope.dropCallback = function (event, index, item, external, listName) {
        item.status = listName;
        item.points = parseInt(item.points);
        Request.feature.updateStatus({ 
          feature_id : item.id, 
          newStatus : item.status }).then(function(){

        });
        if(listName === "complete") {
          //Request.analytics.substractPoints(item);
        }
        return item;
      };

      $scope.addFeature = function (newFeature) {
        $scope.models.lists.backlog.unshift(newFeature);

        Request.feature.create(newFeature).then(function (results) {
          newFeature.id = results.feature_id[0];
        });
        $scope.feature = {
          sprint_id: 1,
          name: "",
          description: "",
          points: 0,
          status: "backlog"
        };
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
