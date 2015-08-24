angular.module('scrummage')

  .controller('burndownCtrl', ['$scope', 'Request', 'ColumnPoints', 'Sprint', function ($scope, Request, ColumnPoints, Sprint) {

    $scope.columnData;
    $scope.labelData;

    $scope.updateColumnData = function(columnData) {
      for(var i = 0; i < $scope.data.labels.length; i++) {
        if($scope.data.labels[i] === columnData.date) {
          $scope.data.datasets[0].data[i] = columnData.backlog + columnData.progress;
          $scope.data.datasets[1].data[i] = columnData.backlog;
        }
      }
    };

    $scope.updateLabelData = function(labelData) {
      $scope.data.labels = labelData.dateArray;
    };

    $scope.data = {
        labels: [],
        datasets: [
          {
            label: 'In Progress',
            fillColor: '#FAA43A',
            strokeColor: '#FAA43A',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            label: 'Backlog',
            fillColor: '#5DA5DA',
            strokeColor: '#5DA5DA',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            label: 'Ideal Line',
            fillColor: 'rgba(255, 255, 255, 0)',
            strokeColor: 'rgba(255,255,255,1)',
            data: [80, 66.667, 52.333, 39, 26.667, 13.333, 0]
          }
        ]
      };

      // UNDER CONSTRUCTION: ideal line generator

      // $scope.generateLineData = function (pointsX, pointsY) {
      //   var resultsArr = [];
      //   var dy = pointsY[0] / pointsX.length;
      //   resultsArr.length = pointsX.length;
      //   for(var i = 1; i < resultsArr.length; i++) {
      //     resultsArr.push(resultsArr[i] - dy);
      //   }
      //   return resultsArr;
      // };

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

      $scope.$watch(
        function () {
          return ColumnPoints.getColumns();
        },

        function (newValue, oldValue) {
          console.log(oldValue);
          $scope.columnData = newValue;
          $scope.updateColumnData(newValue);
        }, true);

      $scope.$watch(
        function () {
          return Sprint.getSprint();
        },

        function (newValue, oldValue) {
          console.log(oldValue);
          $scope.labelData = newValue;
          $scope.updateLabelData(newValue);
        }, true);
  }]);
