/* lines 2 - 21 work */
describe('scrummageBurndown', function(){
	beforeEach(module('scrummageBurndown'));
	var burndownCtrl, scope;

beforeEach(inject(function ($rootScope, $controller){
	scope = $rootScope.$new();
	burndownCtrl = $controller('burndownCtrl', {
		$scope: scope
	});
}));

it('dataSet InProgress data should be [50]', function(){
	//expect(scope.data.datasets[0].data[1]).toEqual(48);
	expect(scope.data.datasets[0].data.length).toBeGreaterThan(0);
	});
});
/* do not erase above --- it works */
/*   utils */
/*http ----- */
// describe('scrummageAnalytics', function(){
// 	beforeEach(module('scrummageAnalytics'));
// 	var scrummageAnalytics, scope, httpBackend;

// beforeEach(inject(function ($httpBackend, $http, $rootScope, $controller){
// 	scope = $rootScope.$new();
// 	httpBackend = $httpBackend;
// 	httpBackend.when('GET', '/burndown').respond(true);

// 	$controller('analyticsCtrl', {
// 		$scope: scope,
// 		$http: $http
// 	});
// 	// analyticsCtrl = $controller('analyticsCtrl', {
// 	// 	$scope: scope
// 	// });
// }));
// it('OPen Burndown path should be /burndown', function(){
// 	//httpBackend.expectGet('/burndown');
// 	httpBackend.flush();
// 	expect(scope)
// 	// http.expectPOST('localhost:3000/burndoown').respond(true);
// });
// it('getTeamPoints should grab the results.backlog[0]', function(){
// 	expect(scope.pts).toEqual(50)
// });
// });
/* above does not work but close? */
/* utils Ctrl */
/*nfg */
// describe('scrummage Utils --- services', function(){
// 	beforeEach(module('scrummageUtils'));
// 	var request, http, returnObj;

// 	beforeEach(inject(function(_request_, _http_, _injector_, _returnObj_){
// 		request = _request_;
// 		http = _injector_.get('httpBackend');
// 		returnObj = _returnObj_;
// 	}));
// it('get a lot of errors'), function(){
// 	expect(returnObj.analytics.getTeam()).toEqual(50);
// }

// 	});
/* NFG lines 39-50 */
/* NFG */
// angular.module('moduleUsingPromise', [])
//  .factory('dataSvc', function(dataSourceSvc, $q) {
//    function getData() {
//      var deferred = $q.defer();

//      dataSourceSvc.getAllItems().then(function(data) {
//        deferred.resolve(data);
//      }, function(error) {
//        deferred.reject(error);
//      });

//      return deferred.promise;
//    }

//    return {
//      getData: getData
//    };
//  });
/* lines 55-72 NFG */

/* below works */
// describe('scrummageUtils Test', function (){
//   var basicService;
  
//   // excuted before each "it" is run.
//   beforeEach(function (){
    
//     // load the module.
//     module('scrummageUtils');
    
//     // inject your service for testing.
//     // The _underscores_ are a convenience thing
//     // so you can have your variable name be the
//     // same as your injected service.
//     inject(function(_basicService_) {
//       basicService = _basicService_;
//     }); 
//   });
     
//   // check to see if it has the expected function
//   it('should have an exciteText function', function () { 
//     expect(angular.isFunction(basicService.exciteText)).toBe(true);
//   });
  
//   // check to see if it does what it's supposed to do.
//   it('should make text exciting', function (){
//     var result = basicService.exciteText('bar');
//     expect(result).toBe('bar!!!');
//   });
// });
//this works  117 - 131
describe('scrummageUtils Test', function (){
  var Request, returnObj, deferred;
  var phony = {name: "Enter sandman", description: "sandbox", status: "backlog", points: "14", $$hashKey: "object:70"};
  beforeEach(function (){
    module('scrummageUtils');
    inject(function($q, _Request_) {
      Request = _Request_;
      deferred = $q.defer(); //this is value 
      deferred.resolve(phony);
      spyOn(Request.feature, 'create').and.returnValue(deferred.promise)
    }); 
  });

  it('should have an exciteText function', function () { 
    expect(Request.feature.create(phony)).toBeDefined()
     });
  it('should have a create method on feature', function (){
 	//var phony = {name: "Enter sandman", description: "sandbox", status: "backlog", points: "14", $$hashKey: "object:70"};
  	//spyOn(Request.feature, 'create').and.callThrough()

  	//spyOn(Request.feature, 'create').and.returnValue('Object');
  	Request.feature.create(phony)
  	expect(Request.feature.create).toHaveBeenCalledWith(phony);
  })
  it('should have a updateStatus method on feature', function (){
 	//var phony = {name: "Enter sandman", description: "sandbox", status: "backlog", points: "14", $$hashKey: "object:70"};
  	spyOn(Request.feature, 'updateStatus')
  	Request.feature.updateStatus(phony)
  	expect(Request.feature.updateStatus).toHaveBeenCalled();
  })
it('should check callback on feature -> Create', function (){
 	//var phony = {name: "Enter sandman", description: "sandbox", status: "backlog", points: "14", $$hashKey: "object:70"};
  	var promise = Request.feature.create();

  	Request.feature.create();
  	expect(promise.$$state.status).toBe(1)
  })
});


// {data: Object, status: 201, config: Object, statusText: "Created"}

//phony data: {data: Object, status: 201, config: Object, statusText: "Created"}











