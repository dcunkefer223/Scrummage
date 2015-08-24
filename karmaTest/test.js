// describe('Hello World example', function() {

// beforeEach(module('myApp'));

// var HelloWorldController,
// scope;

// beforeEach(inject(function ($rootScope, $controller) {
// scope = $rootScope.$new();
// HelloWorldController = $controller('HelloWorldController', {
// $scope: scope
// });
// }));
// it('says hello world!', function () {
// expect(scope.greeting).toEqual("Hello World!");
// });

// });


// 'use strict';

// describe('Controller: public/AboutController', function() {

//     var $rootScope, $scope, $controller;

//     beforeEach(module('jiwhizWeb'));

//     beforeEach(inject(function(_$rootScope_, _$controller_){
//         $rootScope = _$rootScope_;
//         $scope = $rootScope.$new();
//         $controller = _$controller_;

//         $controller('AboutController', {'$rootScope' : $rootScope, '$scope': $scope});
//     }));

//     it('should make about menu item active.', function() {
//         expect($rootScope.activeMenu.about == 'active');
//     });

//     it('should show title.', function() {
//         expect($rootScope.showTitle == true);
//     });

//     it('should have correct page title.', function() {
//         expect($rootScope.page_title).toEqual('About Me');
//     });

//     it('should have correct page description.', function() {
//         expect($rootScope.page_description).toEqual('Here is my story.');
//     });
// });


// var $rootscope,
// 	$scope,
// 	controller;

// beforeEach(function(){
// 	module('scrummage');
// 	inject(function ($injector){
// 		$rootscope = $injector.get('$rootscope');
// 		$scope = $rootscope.$new();
// 		controller = $injector.get('$controller')("signinCtrl", {$scope: $scope});
// 	});
// });

// describe ("Action Handlers", function (){
// 	describe("eat Slice", function(){
// 		it("should decrement the number of slices", function () {
// 			expect($scope.slices).toEqual(8);
// 			$scope.eatSlice();
// 			expect($scope.slices).toEqual(7);
// 		})
// 	})
// })
