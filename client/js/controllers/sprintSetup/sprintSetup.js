angular.module('scrummage')

  .controller('sprintSetupCtrl', ['$scope', 'Request', '$location', 'Sprint', 'ColumnPoints', function ($scope, Request, $location, Sprint, ColumnPoints) {

    $scope.newSprint = {};

    var formatDate = function (currentDate) {
      var newDate = new Date(currentDate);
      var currentMonth = newDate.getMonth();
      var currentDay = newDate.getDate();
      return ((currentMonth + 1) + '/' + currentDay);
    };

    var dateArray = function (start, end) {
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
          dateArray[i] = formatDate(dateArray[i].toDateString());
        }
        return dateArray;
      }

        return getDates(start, end);
    };

    $scope.createSprint = function (newSprint) {
      Request.user.fetchTeam().then(
        function(response) {
          newSprint.team_id = response.team_id;
        }).then(function () {
          Request.sprint.createSprint(newSprint)
          .then(function (response) {
            console.log(response);

            var name = response.sprint.name;
            var start = formatDate(response.sprint.sprintstart);
            var end = formatDate(response.sprint.sprintend);
            var dateArr = dateArray(new Date(start), new Date(end));
            var sendSprintDates = {
              name : name,
              start : start,
              end : end,
              dateArray : dateArr
            };

            Sprint.setSprint(sendSprintDates);
            var sendColumnPoints = {
              backlog: response.team['backlog'],
              progress: response.team['progress'],
              complete: response.team['complete'],
              date: null
            };
            ColumnPoints.setColumns(sendColumnPoints);
          });
        });
      
      $location.path('/storyboard');
    };

  }]);
