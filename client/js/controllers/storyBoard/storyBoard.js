angular.module('scrummage')
    .controller('storyBoardCtrl', ['$scope', '$interval', 'Request', 'ColumnPoints', 'InitializeAnalytics', function ($scope, $interval, Request, ColumnPoints, InitializeAnalytics) {
      var timer;
      var gate = true;

      $scope.start = function() {
        // stops any running interval to avoid two intervals running at the same time
        $scope.stop(); 
        
        // store the interval promise
        timer = $interval($scope.renderBoard, 3000);
      };
      
      // stops the interval
      $scope.stop = function() {
        $interval.cancel(timer);
      };
      
      $scope.$on('$destroy', function() {
        $scope.stop();
      });

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

      var clearBoard = function () {
        for(var prop in $scope.models.lists) {
          $scope.models.lists[prop].length = 0;
        }
      };

      var formatDate = function (currentDate) {
        var newDate = new Date(currentDate);
        var currentMonth = newDate.getMonth();
        var currentDay = newDate.getDate();
        return ((currentMonth + 1) + '/' + currentDay);
      };

      $scope.dropCallback = function (event, index, item, external, listName) {
        $scope.start();

        item.status = listName;
        item.points = parseInt(item.points);

        if(listName === "backlog") {
          Request.feature.updateStatus({ 
            feature_id : item.id, 
            points : item.points,
            status : item.status }).then(function(response){
              var sendData = {
                backlog: response['team'][0]['backlog'],
                progress: response['team'][0]['progress'],
                complete: response['team'][0]['complete'],
                date: formatDate(response['feature'][0].status_date)
              };
              ColumnPoints.setColumns(sendData);
          });
        }
        else if(listName === "progress") {
          Request.feature.updateStatus({ 
            feature_id : item.id, 
            points : item.points,
            status : item.status }).then(function(response){
              var sendData = {
                backlog: response['team'][0]['backlog'],
                progress: response['team'][0]['progress'],
                complete: response['team'][0]['complete'],
                date: formatDate(response['feature'][0].status_date)
              };
              ColumnPoints.setColumns(sendData);
          });
        }
        else if(listName === "complete") {
          Request.feature.updateStatus({ 
            feature_id : item.id, 
            points : item.points,
            status : item.status }).then(function (response){
              var sendData = {
                backlog: response['team'][0]['backlog'],
                progress: response['team'][0]['progress'],
                complete: response['team'][0]['complete'],
                date: formatDate(response['feature'][0].status_date)
              };
              ColumnPoints.setColumns(sendData);
          });
        }
        return item;
      };

      $scope.addFeature = function (newFeature) {
        $scope.models.lists.backlog.unshift(newFeature);

        Request.feature.create(newFeature).then(function (results) {
          console.log(results);
          newFeature.id = results.feature_id;
          var sendData = {
            backlog: results['team']['backlog'],
            progress: results['team']['progress'],
            complete: results['team']['complete'],
            date: formatDate(results.feature_date)
          };
          ColumnPoints.setColumns(sendData);
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

      $scope.renderBoard = function () {
        console.log('renderBoard was called');
        Request.feature.fetchAll()
        .then(function (results) {
          clearBoard();
          for(var i = 0; i < results.length; i++) {
            for(var key in $scope.models.lists) {
              if(results[i].status === key) {
                $scope.models.lists[key].push(results[i]);
              }
            }
          }
        })
        .then(function () {
          if(gate === true) {
            $scope.initializeData();
            gate = false;
          }
        });
      };

      $scope.initializeData = function () {
        console.log('initialize data was called');
        Request.analytics.getSprintHistory().then(
          function (data) {
            InitializeAnalytics.setData(data);
        });
      };

    }])
    .filter('capitalize', function() {
        return function(input) {
          return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
        };
    });
