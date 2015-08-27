angular.module('scrummageAnalytics', [])

//.controller('analyticsCtrl',function ($scope, $location){
.controller('analyticsCtrl',['$scope','$location', function ($scope, $location){
  $scope.openBurndown = function() {
     $location.path('/burndown');
  };
  // $scope.getTeamPoints = function (){
  //         Request.analytics.getTeam()
  //           .then(function(results){
  //            var pts = results.backlog[0]
  //             //$scope.data.data = (results.backlog[0])
  //              //console.log(results.points)
  //           })
  //              return pts
  //       };
  $scope.openVelocity = function () {
    $location.path('/velocity');
  };

 }]); //end of contr

 //});