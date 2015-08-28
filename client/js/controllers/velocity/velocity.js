angular.module('scrummage')

  .controller('velocityCtrl', ['$scope', 'Request', 'ColumnPoints', 'Sprint', 'InitializeAnalytics', function ($scope, Request, ColumnPoints, Sprint, InitializeAnalytics) {
    var generatedLabels;
    var mockAverage = 30;
    var mockRolling = [0, 22, 28, 33, 28, 25, 36];

    var generateAverageArray = function (average, labels) {
      var results = [];
      for(var i = 0; i < labels.length; i++) {
        results.push(average);
      }
      return results;
    };

    var initializeData = function (data) {
      var averageArray;
      $scope.labels = generatedLabels;
      $scope.series = ['Rolling Average', 'Overall Team Average'];

      if(data.progress) {
        $scope.labels = data.dateArray;
        averageArray = generateAverageArray(mockAverage, $scope.labels);
        $scope.data = [averageArray, mockRolling];
      };

      $scope.colours = [
            {
              fillColor: 'rgba(151,187,205,0)',
              strokeColor: 'rgba(151,187,205,1)',
              pointColor: 'rgba(151,187,205,1)',
              pointStrokeColor: '#fff',
              pointHighlightFill: '#fff',
              pointHighlightStroke: 'rgba(151,187,205,1)'
            },
            {
              fillColor: 'rgba(255, 255, 255,0)',
              strokeColor: 'rgba(255, 255, 255, 1)'
            }
      ];

      $scope.data = [averageArray, mockRolling];

      $scope.options =  {

        // Sets the chart to be responsive
        responsive: true,

        // Boolean - If we should show the scale at all
        showScale: true,

        // Boolean - If we want to override with a hard coded scale
        scaleOverride: true,

        // Boolean - Whether to show labels on the scale
        scaleShowLabels: true,

        // Boolean - Whether the scale should start at zero, or an order of magnitude down from the lowest value
        scaleBeginAtZero: true,

        // Number - Scale label font size in pixels
        scaleFontSize: 18,

        // Number - The number of steps in a hard coded scale
        scaleSteps: 6,

        // Number - The value jump in the hard coded scale
        scaleStepWidth: 10,

        ///Boolean - Whether grid lines are shown across the chart
        scaleShowGridLines : true,

        //String - Colour of the grid lines
        scaleGridLineColor : 'rgba(0,0,0,.1)',

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
        datasetStrokeWidth : 4.5,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        // Function - on animation progress
        onAnimationProgress: function(){},

        // Function - on animation complete
        onAnimationComplete: function(){},

        //String - A legend template
        legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
      };
    };

    var updateRollingAverage = function(rollingData) {
      $scope.data[1] = rollingData;
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
          updateRollingAverage(mockRolling);
        }, true);

  }]);
