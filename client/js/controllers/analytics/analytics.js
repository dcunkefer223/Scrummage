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
      Request.analytics.getTeam()
        .then(function(results){
          console.log(results.backlog[0])
          //$scope.data.data = (results.backlog[0])
           //console.log(results.points)
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
      colors: ["#d8d8d8", "red", "#039676"],
      waitForHeightAndWidth: true,
      isAnimate: true
    };
  // backlog/progress, nocompleted
    $scope.data = {
      series: ['Ideal','In Progress', 'BackLog' ],  // what we are measuring--- will appear in legend
      data: [//{
      //   x: "",   // start date   data: [{x: date, y: [] }]
      //   y: [100, 100] //locked total, 
      // },
      {
        x: "Jan 1",   // start date   data: [{x: date, y: [] }]
        y: [150, 150, 130] //locked total, 
      }, {
        x: "Jan 5",
        y: [120, 135, 125]
      }, {
        x: "Jan 10",
        y: [90, 110, 115]
      }, {
        x: "Jan 15",  //end date?
        y: [60, 75, 75]
      },{
        x: "Jan 20",  //end date?
        y: [30, 65, 70]
      },
       {
        x: "Jan 30",   // start date   data: [{x: date, y: [] }]
        y: [0, 50, 20] //locked total, 
      }
      ]
    };
  });// end of contr

