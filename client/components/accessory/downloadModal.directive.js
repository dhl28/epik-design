'use strict';

angular.module('epikDesignApp')
  .directive('epikDownloaderModal', function ($modal) {
    return {
      template: '<a class="btn btn-info" ng-click="openDownloadModal($event);">查看文件...</a>',
      restrict: 'EA',
      scope: {
        fileList: '='
      },
      link: function (scope, elements, attrs, controller) {
        scope.openDownloadModal = function ($event) {
          var modalInstance = $modal.open({
            templateUrl: '/components/accessory/donwloadModal.html',
            size: 'lg',
            resolve: {
              fileList: function () {
                return scope.fileList;
              }
            },
            controller: function ($scope, $modalInstance, fileList) {
              $scope.fileList = fileList;
              $scope.cancel = function () {
                $modalInstance.close();
              }
            }
          });
        }
      }
    };
  });
