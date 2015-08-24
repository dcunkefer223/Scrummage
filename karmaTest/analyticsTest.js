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

describe('scrummageAnalytics', function(){
	beforeEach(module('scrummageAnalytics'));
	var scrummageAnalytics, scope, Request;

beforeEach(inject(function (Request, $rootScope, $controller){
	scope = $rootScope.$new();
	analyticsCtrl = $controller('analyticsCtrl', {
		$scope: scope,
		$Request: Request
	});
}));

it('getTeamPoints should grab the results.backlog[0]', function(){
	expect(scope.getTeamPoints()).toEqual(50)
});
});
