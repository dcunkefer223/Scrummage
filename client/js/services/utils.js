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
            // console.log(resp.data)
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
            url: '/getallfeatures',
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        fetch : function (status) {
          return $http({
            method: 'GET',
            url: '/getfeaturesbystatus?team_id=1&status=' + status,
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
        getSprintHistory : function () {
          return $http({
            method: 'GET',
            url: '/getsprinthistory'
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
      //   fetchTotal : function() {
      //     return $http({
      //       method: 'GET',
      //       url: '/fetchtotalpoints',
      //     }).then(function (resp) {
      //       return resp.data;
      //     }, noAuthRedirect);
      //   }
        },

      user : {
        joinTeam : function (data) {
          return $http({
            method: 'POST',
            url: '/jointeam',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },

        fetchUser : function (data) {
          return $http({
            method: 'GET',
            url: '/fetchuser',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },

        createTeam : function (data) {
          return $http({
            method: 'POST',
            url: '/addTeam',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },

        fetchTeam : function () {
          return $http({
            method: 'GET',
            url: '/fetchuserteam',
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },

        leaveTeam : function (data) {
          return $http({
            method: 'POST',
            url: '/leaveteam',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        }
      },

      sprint : {
        createSprint : function (data) {
          return $http({
            method: 'POST',
            url: '/createsprint',
            data: data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        },
        fetchAllPoints : function(data) {
          return $http({
            method: 'GET',
            url: '/getallpoints',
            data : data
          }).then(function (resp) {
            return resp.data;
          }, noAuthRedirect);
        }
      }
    };

    return returnObj;
  })
  .factory('InitializeAnalytics', function () {
    var dataObj = {};

    return {
      getData : function () {
        return dataObj;
      },
      setData : function (data) {
        dataObj = data;
      }
    }
  })

  .factory('ColumnPoints', function () {
    var columns = {};

    return {
      getColumns : function () {
        return columns;
      },
      setColumns : function (data) {
        columns.backlog = data.backlog;
        columns.progress = data.progress;
        columns.complete = data.complete;
        columns.date = data.date;
      }
    };
  })

  .factory('Sprint', function () {
    var sprintData = {};

    return {
      getSprint : function () {
        return sprintData;
      },
      setSprint : function(data) {
        sprintData.name = data.name;
        sprintData.start = data.start;
        sprintData.end = data.end;
        sprintData.dateArray = data.dateArray;
      }
    };
  });

