angular.module('scrummageBurndown', [])

  .controller('burndownCtrl',['$scope', function ($scope, Request) {
    // $scope.getTeamPoints = function (){
    //   Request.analytics.getTeam()
    //     .then(function(results){
    //       $scope.data.datasets[0].data.push(results.backlog[0])
    //       //$scope.data.datasets[1].data.unshift(results.backlog[0])
          
    //       console.log(results.backlog[0])
    //       //$scope.data.data = (results.backlog[0])
    //        //console.log(results.points)
    //     })
    // }
    $scope.data = {
        labels: ['8/23', '8/24', '8/25', '8/26', '8/27', '8/28', '8/29'],
        datasets: [
          {
            label: 'In Progress',
            fillColor: 'rgba(220,220,220,0.7)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: [50,48,29,28,38]
          },
          {
            label: 'Backlog',
            fillColor: 'rgba(151,187,205,1)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: [ 55, 47, 31]
          },
          {
            fillColor: 'rgba(255, 255, 255,0)',
            strokeColor: 'rgba(255, 255, 255 1)',
            data: [80, 66.667, 52.333, 39, 26.667, 13.333, 0]
          }
        ]
      };

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
//});
  }]);

