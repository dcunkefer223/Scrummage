angular.module('scrummage')

  .controller('analyticsCtrl', function($scope){
    console.log('analyticsCtrl  is here')
    $scope.open = function() {
      $scope.showModal = true;
    };

    $scope.ok = function() {
      $scope.showModal = false;
    };

    $scope.cancel = function() {
      $scope.showModal = false;
    };

    $scope.config = {
      title: 'Products',
      tooltips: true,
      labels: false,
      mouseover: function() {},
      mouseout: function() {},
      click: function() {},
      legend: {
        display: true,
        //could be 'left, right'
        position: 'right'
      }
    };
  // backlog/progress, nocompleted
    $scope.data = {
      series: ['Ideal Burn Rate', 'Actual'],  // series is the Y axis
      data: [{
        x: "Jan 1",
        y: [100, 100]
      }, {
        x: "Jan 5",
        y: [75, 80]
      }, {
        x: "Jan 10",
        y: [50, 76]
      }, {
        x: "Jan 15",
        y: [0, 20]
      }]
    };
  });

