angular.module('scrummage')

  .factory('Request', function($http, $location){
    var noAuthRedirect = function () { $location.path('/'); };
    var returnObj = {
      feature : {
        create : function (data) {
          return $http({
            method: 'POST',
            url: '/tasks',
            data: data
          }).then(function (resp) {
            return response.data;
          }, noAuthRedirect);
        },
        updateTitle : function (data) {
          return $http({
            method: 'POST',
            url: '/changetitle',
            data: data
          }).then(function (resp) {
            return response.data;
          }, noAuthRedirect);
        },
        updateDescription : function (data) {
          return $http({
            method: 'POST',
            url: '/changedesc',
            data: data
          }).then(function (resp) {
            return response.data;
          }, noAuthRedirect);
        },
        updatePoints : function (data) {
          return $http({
            method: 'POST',
            url: '/changefeaturepoints',
            data: data
          }).then(function (resp) {
            return response.data;
          }, noAuthRedirect);
        },
        updateStatus : function (data) {
          return $http({
            method: 'POST',
            url: '/changestatus',
            data: data
          }).then(function (resp) {
            return response.data;
          }, noAuthRedirect);
        },
        updateUser : function (data) {
          return $http({
            method: 'POST',
            url: '/changefeatureuser',
            data: data
          }).then(function (resp) {
            return response.data;
          }, noAuthRedirect);
        }
        fetchAll : function () {
          return $http({
            method: 'GET',
            url: '/getallfeatures',
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        fetch : function () {
          return $http({
            method: 'GET',
            url: '/getfeaturesbystatus',
          }).then(function (resp){
            return resp.data;
          }, noAuthRedirect);
        }
      },

      comment : {
        create : function (data) {
          return $http({
            method: 'POST',
            url: '/addcomment',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        fetchAll : function () {
          return $http({
            method: 'GET',
            url: '/getcomments'
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        }
      },

      analytics : {

      },

      user : {

      },

      team : {

      }
    };

    return returnObj;
  });