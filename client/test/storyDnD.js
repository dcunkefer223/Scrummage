angular.module("demo",['dndLists'])

.controller("SimpleDemoController", function($scope) {
    $scope.models = {
        selected: null,
        lists: {"A": [], "B": []}
    };

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
        $scope.models.lists.A.push({label: "In Progress" + i});
        $scope.models.lists.B.push({label: "Completed" + i});
    }

    // // Model to JSON for demo purpose
    // $scope.$watch('models', function(model) {
    //     $scope.modelAsJson = angular.toJson(model, true);
    // }, true);

});