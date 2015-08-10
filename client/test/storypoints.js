angular.module('app', ['ngDraggable'])


app.controller('MainCtrl', function ($scope) {
    $scope.onDragComplete=function(data,evt){
       console.log("drag success, data:", data);
    }
    $scope.onDropComplete=function(data,evt){
        console.log("drop success, data:", data);
    }
 };

 // angular.module("ngDraggable", [])
 //        .service('ngDraggable', [function() {


 //            var scope = this;
 //            scope.inputEvent = function(event) {
 //                if (angular.isDefined(event.touches)) {
 //                    return event.touches[0];
 //                }
 //                //Checking both is not redundent. If only check if touches isDefined, angularjs isDefnied will return error and stop the remaining scripty if event.originalEvent is not defined.
 //                else if (angular.isDefined(event.originalEvent) && angular.isDefined(event.originalEvent.touches)) {
 //                    return event.originalEvent.touches[0];
 //                }
 //                return event;
 //            };

 //        }])