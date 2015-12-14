'use strict';

angular.module('epikDesignApp')

  .factory('apiService', function ($http, $q) {
    // Service logic
    function _getPagedCustomers(paginationOptions) {
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

    function _getCustomers(query) {
      var deferred = $q.defer();
      $http.get('/api/customers', query).success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    function _getCustomer(id) {
      var deferred = $q.defer();
      $http.get('/api/customers/customer/' + id).success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    // Public API here
    return {
      getPagedCustomers: _getPagedCustomers,
      getCustomers: _getCustomers,
      getCustomer: _getCustomer
    };
  });
