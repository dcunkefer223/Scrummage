
angular.module('App', ['ngDraggable'])
      .controller('MainCtrl', function ($scope) {
        $scope.draggableObjects = [{name:'Task One'}, {name:'two'}, {name:'three'}, {name:'no-clone', allowClone:false}];
        $scope.droppedObjects1 = [];
        $scope.droppedObjects2= [];
        $scope.droppedObjects3= [];
        $scope.onDropComplete1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            if (index == -1)
            $scope.droppedObjects1.push(data);
        }
        $scope.onDragSuccess1=function(data,evt){
            var index = $scope.droppedObjects1.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects1.splice(index, 1);
            }
        }
        $scope.onDragSuccess2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects2.splice(index, 1);
            }
        }
        $scope.onDragSuccess3=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index > -1) {
                $scope.droppedObjects3.splice(index, 1);
            }
        }
        $scope.onDropComplete2=function(data,evt){
            var index = $scope.droppedObjects2.indexOf(data);
            if (index == -1) {
                $scope.droppedObjects2.push(data);
            }
        }
        $scope.onDropComplete3=function(data,evt){
            var index = $scope.droppedObjects3.indexOf(data);
            if (index == -1) {
                $scope.droppedObjects3.push(data);
            }
        }
        var inArray = function(array, obj) {
            var index = array.indexOf(obj);
        }
      });