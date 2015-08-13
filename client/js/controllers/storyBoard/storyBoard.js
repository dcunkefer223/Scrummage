angular.module('scrummage')
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
        sprint_id: 1,
        name: "",
        description: "",
        points: 0,
        status: "backlog"
      };

      $scope.backlogTotal = function() {
        var sum = 0;
        for(var i = 0; i < $scope.models.lists['backlog'].length; i++) {
          sum += $scope.models.lists['backlog'][i].points;
        }
        console.log('The backlog total is ', sum);
        return sum;
      };

      $scope.progressTotal = function() {
        var sum = 0;
        for(var i = 0; i < $scope.models.lists['progress'].length; i++) {
          sum += $scope.models.lists['progress'][i].points;
        }
        console.log('The progress total is ', sum);
        return sum;
      };

      $scope.completeTotal = function() {
        var sum = 0;
        for(var i = 0; i < $scope.models.lists['complete'].length; i++) {
          sum += $scope.models.lists['complete'][i].points;
        }
        console.log('The completed total is ', sum);
        return sum;
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
          console.log('rendered');
        });
      };

      $scope.renderBoard();


      var intervalPromise = $interval($scope.renderBoard, 3000);

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
          // console.log('The feature_id is ', results.feature_id)
          newFeature.id = results.feature_id;
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
