angular.module('scrummageStoryboard', [])
    .controller('storyBoardCtrl', function ($scope, $interval, Request) {

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
        status: "backlog",
      };

      $scope.clearBoard = function () {
        for(var prop in $scope.models.lists) {
          $scope.models.lists[prop].length = 0;
        }
      };

      $scope.renderBoard = function () {
        Request.feature.fetchAll().then(function (results) {
          $scope.clearBoard();
          for(var i = 0; i < results.length; i++) {
            for(var key in $scope.models.lists) {
              if(results[i].status === key) {
                $scope.models.lists[key].push(results[i]);
              }
            }
          }
        });
      };

      $scope.renderBoard();

      $scope.dropCallback = function (event, index, item, external, listName) {
        item.status = listName;
        item.points = parseInt(item.points);

        if(listName === "backlog") {
          Request.feature.updateStatus({ 
            feature_id : item.id, 
            points : item.points,
            status : item.status }).then(function(){

          });
        }
        else if(listName === "progress") {
          Request.feature.updateStatus({ 
            feature_id : item.id, 
            points : item.points,
            status : item.status }).then(function(){

          });
        }
        else if(listName === "complete") {
          Request.feature.updateStatus({ 
            feature_id : item.id, 
            points : item.points,
            status : item.status }).then(function(){

          });
        }

        return item;
      };

      $scope.addFeature = function (newFeature) {
        $scope.models.lists.backlog.unshift(newFeature);

        Request.feature.create(newFeature).then(function (results) {
          // console.log('The feature_id is ', results.feature_id)
          newFeature.id = results.feature_id;
        });
        $scope.feature = {
          name: "",
          description: "",
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
