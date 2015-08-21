angular.module('scrummage')

  .controller('analyticsCtrl', function ($scope, $location, Request){

  // $scope.openBurndown = function () {
  //   $location.path('/burndown');
  // };
// $scope.getTeamPoints = function (){
//           Request.analytics.getTeam()
//             .then(function(results){
//               console.log(results.backlog[0])
//               //$scope.data.data = (results.backlog[0])
//                //console.log(results.points)
//             })
//         };
  $scope.openVelocity = function () {
    $location.path('/velocity');
  };

  });// end of contr

