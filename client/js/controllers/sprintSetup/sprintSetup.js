angular.module('scrummage')

  .controller('sprintSetupCtrl', ['$scope', 'Request', '$location', 'Sprint', function ($scope, Request, $location, Sprint) {

    $scope.newSprint = {};

    $scope.formatDate = function (currentDate) {
      var newDate = new Date(currentDate);
      var currentMonth = newDate.getMonth();
      var currentDay = newDate.getDate();
      return ((currentMonth + 1) + '/' + currentDay);
    };

    $scope.dateArray = function (start, end) {
      Date.prototype.addDays = function(days) {
        var dat = new Date(this.valueOf());
        dat.setDate(dat.getDate() + days);
        return dat;
      };

      function getDates(startDate, stopDate) {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
          dateArray.push(currentDate);
          currentDate = currentDate.addDays(1);
        }
        for(var i = 0; i < dateArray.length; i++) {
          dateArray[i] = $scope.formatDate(dateArray[i].toDateString());
        }
        return dateArray;
      }

        return getDates(start, end);
    };

    $scope.createSprint = function (newSprint) {
      Request.sprint.createSprint(newSprint)
      .then(function (response) {
        var name = response[0].name;
        var start = $scope.formatDate(response[0].sprintstart);
        var end = $scope.formatDate(response[0].sprintend);
        var dateArr = $scope.dateArray(new Date(start), new Date(end));
        var sendData = {
          name : name,
          start : start,
          end : end,
          dateArray : dateArr
        };

        Sprint.setSprint(sendData);
      });
      
      $location.path('/storyboard');
    };

  }]);
