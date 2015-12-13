/**
 * Created by YanJia on 2015/10/28.
 */
angular.module('epikDesignApp')
  .directive('epikDownloader', function ($modal, accessory, $window, $parse) {
    return {
      templateUrl: '/components/accessory/downloadFileList.html',
      restrict: 'EA',
      scope: {
        fileList: '='
      },
      link: function (scope, elements, attrs) {
        scope.selectDocumentIds = [], scope.fileAllSelected = false;

        function getDocumentFileList(documentIdList) {
          if (documentIdList) {
            accessory.getDocumentFileList(documentIdList).then(function (data) {
              scope.documentFileList = [];
              for (var doc in data) {
                for (var file in data[doc]) {
                  scope.documentFileList.push({
                    documentId: doc,
                    contentType: data[doc][file]["contentType"],
                    retrievalName: data[doc][file]["retrievalName"],
                    contentSize: data[doc][file]["contentSize"]
                  });
                }
              }
            });
          }
        }

        scope.selectAllChange = function () {
          if (scope.fileAllSelected) {
            _.forEach(scope.documentFileList, function (file) {
              file.selected = true;
            })
            return;
          }

          _.forEach(scope.documentFileList, function (file) {
            file.selected = false;
          })
        }
        scope.downloadFiles = function () {
          if (scope.selectDocumentIds.length === 0) {
            return;
          }
          $window.open('/api/accessories/downloadpack?documentIds=' + JSON.stringify(scope.selectDocumentIds));
        }
        scope.removeFile = function (documentId, retrievalName) {
          if (_.isArray(scope.fileList)) {
            var documentsJSON = scope.fileList;
          } else {
            var documentsJSON = JSON.parse(scope.fileList);
          }
          _.remove(documentsJSON, function (n) {
            return (n.documentId === documentId && n.filename === retrievalName);
          });
          if (documentsJSON.length === 0) {
            scope.fileList = null;
          } else {
            scope.fileList = JSON.stringify(documentsJSON);
          }
        }
        scope.$watch('fileList', function (value) {
          if (value) {
            if (_.isArray(value)) {
              var documentsJSON = value;
            } else {
              var documentsJSON = JSON.parse(value);
            }

            if (_.isArray(documentsJSON) && documentsJSON.length > 0) {
              var documentIdList = _.pluck(documentsJSON, 'documentId');
              getDocumentFileList(documentIdList);
            }
          } else {
            scope.documentFileList = []
          }
        }, true);

        scope.$watch('documentFileList', function (value) {
          scope.selectDocumentIds = [];
          if (_.isArray(value) && value.length > 0) {
            _.forEach(value, function (file) {
              if (file.selected) {
                scope.selectDocumentIds.push({
                  documentId: file.documentId,
                  retrievalName: file.retrievalName
                });
              }
            })
          }
        }, true);
      }
    }
  });
