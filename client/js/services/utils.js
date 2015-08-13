angular.module('scrummage')

  .factory('Request', function($http, $location){
    var noAuthRedirect = function () { $location.path('/'); };
    var returnObj = {
      feature : {
        create : function (data) {
          return $http({
            method: 'POST',
            url: '/addfeature',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        updateTitle : function (data) {
          return $http({
            method: 'POST',
            url: '/changetitle',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        updateDescription : function (data) {
          return $http({
            method: 'POST',
            url: '/changedesc',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        updatePoints : function (data) {
          return $http({
            method: 'POST',
            url: '/changefeaturepoints',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        updateStatus : function (data) {
          return $http({
            method: 'POST',
            url: '/changestatus',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        updateUser : function (data) {
          return $http({
            method: 'POST',
            url: '/changefeatureuser',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        fetchAll : function () {
          return $http({
            method: 'GET',
            url: '/getallfeatures?sprint_id=1',
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        fetch : function (status) {
          return $http({
            method: 'GET',
            url: '/getfeaturesbystatus?sprint_id=1&status=' + status,
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
        fetchAll : function (feature_id) {
          return $http({
            method: 'GET',
            url: '/getcomments?feature_id=' + feature_id,
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        }
      },

      analytics : {
        updatePoints : function (data) {
          return $http({
            method: 'POST',
            url: '/updatetotalpoints',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        addPoints : function (data) {
          return $http({
            method: 'POST',
            url: '/addpoints',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        substractPoints : function (data) {
          return $http({
            method: 'POST',
            url: '/substractpoints',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        fetchTotal : function() {
          return $http({
            method: 'GET',
            url: '/fetchtotalpoints',
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        }
      },

      user : {

      },

      team : {

      }
    };

    return returnObj;
  });