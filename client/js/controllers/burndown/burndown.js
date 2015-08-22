angular.module('scrummage')

  .controller('burndownCtrl', ['$scope', 'Request', 'ColumnPoints', function ($scope, Request, ColumnPoints) {

    $scope.columnData;

    $scope.updateData = function(columnData) {
      for(var i = 0; i < $scope.data.labels.length; i++) {
        if($scope.data.labels[i] === columnData.date) {
          $scope.data.datasets[0].data[i] = columnData.backlog + columnData.progress;
          $scope.data.datasets[1].data[i] = columnData.backlog;
        }
      }
      console.log($scope.data.datasets);
    };

    $scope.data = {
        labels: ['8/16' ,'8/17', '8/18', '8/19', '8/20', '8/21', '8/22'],
        datasets: [
          {
            label: 'In Progress',
            fillColor: '#FAA43A',
            strokeColor: '#FAA43A',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [80, 72, 64, 43]
          },
          {
            label: 'Backlog',
            fillColor: '#5DA5DA',
            strokeColor: '#5DA5DA',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [80, 55, 47, 31]
          },
          {
            label: 'Ideal Line',
            fillColor: 'rgba(255, 255, 255, 0)',
            strokeColor: 'rgba(255,255,255,1)',
            data: [80, 66.667, 52.333, 39, 26.667, 13.333, 0]
          }
        ]
      };

      // Under construction ideal line generator
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
          console.log(newValue);
          $scope.columnData = newValue;
          $scope.updateData(newValue);
        }, true);
  }]);
