angular.module('scrummageVelocity', [])

  .controller('velocityCtrl', function ($scope, Request) {
    
    $scope.data = {
        labels: ['8/23', '8/24', '8/25', '8/26', '8/27', '8/28', '8/29'],
        datasets: [
          {
            label: 'In Progress',
            fillColor: 'rgba(151,187,205,0)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [0, 22, 28, 33, 28, 25, 36]
          },
          {
            fillColor: 'rgba(255, 255, 255,0)',
            strokeColor: 'rgba(255, 255, 255 1)',
            data: [30, 30, 30, 30, 30, 30, 30]
          }
        ]
      };
      // $scope.data.datasets[1]
      //   .data.push($scope.data.datasets[0].data(function))
      // $scope.generateLineData = function (pointsX, pointsY) {
      //   var resultsArr = [];
      //   var dy = pointsY[0] / pointsX.length;
      //   resultsArr.length = pointsX.length;
      //   for(var i = 1; i < pointsX.length; i++) {
      //     resultsArr.push(pointsX[0]);
      //   }
      //   return resultsArr;
      // };

      $scope.options =  {
        // Sets the chart to be responsive
        responsive: true,

        // Number - Scale label font size in pixels
        scaleFontSize: 18,

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
        datasetStrokeWidth : 2,

        //Boolean - Whether to fill the dataset with a colour
        datasetFill : true,

        // Function - on animation progress
        onAnimationProgress: function(){},

        // Function - on animation complete
        onAnimationComplete: function(){},

        //String - A legend template
        legendTemplate : '<ul class="tc-chart-js-legend"><% for (var i=0; i<datasets.length; i++){%><li><span style="background-color:<%=datasets[i].strokeColor%>"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
      };

  });
