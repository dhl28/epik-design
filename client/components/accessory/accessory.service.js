'use strict';

angular.module('epikDesignApp')
  .factory('accessory', function ($http, $q) {
    var _downloadFile = function(documentId, filename) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/accessories/download',
        params: {
          documentId : documentId,
          filename: filename
        }
      }).success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    var _getDocumentFileList = function(documentIdList) {
      var deferred = $q.defer();
      $http({
        method: 'GET',
        url: '/api/accessories/documentfilelist',
        params: {
          documentIdList : documentIdList
        }
      }).success(function (data, status, headers, config) {
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });
      return deferred.promise;
    }

    return {
      downloadFile: _downloadFile,
      getDocumentFileList : _getDocumentFileList
    };
  });
