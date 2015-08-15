angular.module('scrummage')

  .controller('analyticsCtrl', function($scope, Request){
    $scope.open = function() {
      $scope.showModal = true;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };
    // $scope.chartActive = true;
    $scope.getTeamPoints = function (){
      Request.analytics.getTeam().then(function(results){
        console.log(results)
        // console.log(results.points)
      })
    }


    $scope.config = {
      title: 'Points',
      tooltips: true,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: true,
        //could be 'left, right'
        position: 'right'
      },
      colors: ["grey", "red"],
      waitForHeightAndWidth: true,
      isAnimate: true
    };
  // backlog/progress, nocompleted
    $scope.data = {
      series: ['Ideal', 'Actual'],  // what we are measuring--- will appear in legend
      data: [{
        x: "Jan 1",   // start date   data: [{x: date, y: [] }]
        y: [100, 100] //locked total, 
      }, {
        x: "Jan 5",
        y: [75, 80]
      }, {
        x: "Jan 10",
        y: [50, 24]
      }, {
        x: "Jan 15",  //end date?
        y: [10, 20]
      },{
        x: "Jan 20",  //end date?
        y: [0, 20]
      },
      {
      x: "Jan 25",  //end date?
        y: [0, 0]
      }]
    };
  });

