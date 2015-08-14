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
      waitForHeightAndWidth: true
    };
  // backlog/progress, nocompleted
    $scope.data = {
      series: ['Ideal Burn Rate', 'Actual'],  // what we are measuring--- will appear in legend
      data: [{
        x: "Jan 1",   // start date   data: [{x: date, y: [] }]
        y: [100, 100]
      }, {
        x: "Jan 5",
        y: [75, 80]
      }, {
        x: "Jan 10",
        y: [50, 76]
      }, {
        x: "Jan 15",  //end date?
        y: [0, 20]
      },{
      x: "Jan 20",  //end date?
        y: [0, 0]
      }]
    };
  });

