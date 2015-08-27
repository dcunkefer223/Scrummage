angular.module('scrummage')

  .controller('burndownCtrl', ['$scope', 'Request', 'ColumnPoints', 'Sprint', 'InitializeAnalytics', function ($scope, Request, ColumnPoints, Sprint, InitializeAnalytics) {

    var generatedLabels;

    var initializeData = function (data) {

      var idealLine = function(progress, labels) {
        var results = [];
        var first = progress[0];
        var step = (first.toFixed(3) / (labels.length - 1).toFixed(3));
        for(var i = 0; i < labels.length; i++) {
          debugger;
          results.push(first);
          first -= step;
        }
        return results;
      };
      $scope.labels = generatedLabels;
      $scope.series = ['Progress', 'Backlog', 'Ideal Line'];
      if(data.progress) {
        $scope.labels = data.dateArray;
        $scope.data = [data.progress, data.backlog, idealLine(data.progress, data.dateArray)];
      } else {
        $scope.data = [[0],[0], idealLine(data.progress, data.dates)];
      }
      $scope.options =  {

        // Sets the chart to be responsive
        responsive: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        // Number - Scale label font size in pixels
        scaleFontSize: 18,

        // Number - The value jump in the hard coded scale
        scaleStepWidth: 10,

        //String - Colour of the grid lines
        scaleGridLineColor : 'rgba(0, 0, 0, .1)',

        //Number - Width of the grid lines
        scaleGridLineWidth : 1,

        //Boolean - Whether the line is curved between points
        bezierCurve : false,

        //Number - Tension of the bezier curve between points
        bezierCurveTension : 0.4,

        //Boolean - Whether to show a dot for each point
        pointDot : false,

        //Number - Radius of each point dot in pixels
        pointDotRadius : 4,

        //Number - Pixel width of point dot stroke
        pointDotStrokeWidth : 1,

        //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
        pointHitDetectionRadius : 20,

        //Boolean - Whether to show a stroke for datasets
        datasetStroke : true,

        //Number - Pixel width of dataset stroke
        datasetStrokeWidth : 4,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        // String - Animation easing effect
        animationEasing: "easeOutExpo",

        // Function - on animation progress
        onAnimationProgress: function(){},

        // Function - on animation complete
        onAnimationComplete: function(){},

        //String - A legend template
        legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
      };


      $scope.colours = [
        {
          fillColor: '#FAA43A',
          strokeColor: '#FAA43A',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)'
        },
        {
          fillColor: '#5DA5DA',
          strokeColor: '#5DA5DA',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
        },
        {
          fillColor: 'rgba(255, 255, 255, 0)',
          strokeColor: 'rgba(255,255,255, 1)'
        }
      ];
    };

    var updateColumnData = function(columnData) {
      for(var i = 0; i < $scope.labels.length; i++) {
        if($scope.labels[i] === columnData.date) {
          if(($scope.data[0][i] === undefined) &&
             ($scope.data[1][i] === undefined)) {
            $scope.data[0].push(columnData.backlog + columnData.progress);
            $scope.data[1].push(columnData.backlog);
          }
          else {
            $scope.data[0][i] = columnData.backlog + columnData.progress;
            $scope.data[1][i] = columnData.backlog;
          }
        }
      }
    };

    $scope.$watch(
      function () {
        return Sprint.getSprint();
      },

      function (newValue, oldValue) {
        generatedLabels = newValue.dateArray;
      }, true);


    $scope.$watch(
      function () {
        return InitializeAnalytics.getData();
      },

      function (newValue, oldValue) {
        initializeData(newValue);
      }, true);

    $scope.$watch(
      function () {
        return ColumnPoints.getColumns();
      },

      function (newValue, oldValue) {
        updateColumnData(newValue);
      }, true);

  }]);
