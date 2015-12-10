'use strict';

angular.module('epikDesignApp')

  .factory('apiService', function ($http, $q) {
    // Service logic
    function _getCustomers(paginationOptions) {
      var deferred = $q.defer();
      $http.get('/api/customers/paged-customers', {
        params: paginationOptions
      }).success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    // Public API here
    return {
      getCustomers: _getCustomers
    };
  });
