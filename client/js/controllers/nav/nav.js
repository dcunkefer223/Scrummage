angular.module('scrummage')
  .controller('navCtrl', ['$scope', 'myOffCanvas', function ($scope, myOffCanvas) {
    this.toggle = myOffCanvas.toggle;
  }]);