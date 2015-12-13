'use strict';

angular.module('epikDesignApp')
  .directive('epikUploaderModal', function ($modal) {
    return {
      template: '<btn class="btn btn-info" ng-click="openUploaderModal($event);">选择文件...</btn>',
      restrict: 'EA',
      scope: {
        fileList: '=',
        enforceLength: '=',
        enforceMaxFileSize: '=',
        enforceType: '='
      },
      link: function (scope, elements, attrs) {
        if (!_.isArray(scope.fileList)) {
          throw new Error("需要设置fileList参数为数组");
        }
        scope.openUploaderModal = function ($event) {
          var modalInstance = $modal.open({
            templateUrl: 'components/accessory/uploaderModal.html',
            size: 'lg',
            resolve: {
              uploadOptions: function () {
                return {
                  fileList: scope.fileList,
                  enforceLength: (scope.enforceLength || 10),
                  enforceMaxFileSize: (scope.enforceMaxFileSize || 10485760),
                  enforceType: (scope.enforceType || '(png|jpeg|jpg|gif|doc|docx|xls|xlsx|txt|zip|rar|pdf|ppt)')
                }
              }
            },
            controller: function ($rootScope, $scope, $modalInstance, $cookies, FileUploader, uploadOptions) {
              $scope.cancel = function () {
                $modalInstance.close();
              };

              function clearMsg() {
                $scope.uploadErrMsg = null;
              }

              $scope.removeItem = function (item) {
                item.remove();
                clearMsg();
              }

              $scope.cancelItem = function (item) {
                item.cancel()
                clearMsg();
              }

              $scope.uploadItem = function (item) {
                item.upload();
                clearMsg();
              }

              var uploader = $scope.uploader = new FileUploader({
                url: '/api/accessories/upload',
                headers: {
                  Authorization: 'Bearer ' + $cookies.get('token'),
                  SSO: $cookies.get('ssoToken')
                },
                filters: [{
                  name: 'enforceLength',
                  fn: function (item, options) {
                    debugger;
                    return this.queue.length < uploadOptions.enforceLength;
                  }
                }, {
                  name: 'enforceMaxFileSize',
                  fn: function (item) {
                    return item.size < uploadOptions.enforceMaxFileSize;
                  }
                }, {
                  name: 'enforceType',
                  fn: function (item) {
                    return item.type.match(new RegExp(uploadOptions.enforceType));
                  }
                }]
              });

              uploader.onErrorItem = function (fileItem, response, status, headers) {
                $rootScope.$broadcast('uploadError', response);
                $scope.uploadErrMsg = "文件上传失败：" + response;
              };

              uploader.onSuccessItem = function (fileItem, response, status, headers) {
                $rootScope.$broadcast('uploadSuccess', response);
                uploadOptions.fileList.push(response);
              };

              uploader.onCompleteAll = function () {
                console.info('onCompleteAll');
              };

              uploader.onWhenAddingFileFailed = function (item /*{File|FileLikeObject}*/, filter, options) {
                switch (filter.name) {
                  case "enforceType":
                    $scope.uploadErrMsg = "仅支持上传以下类型的文件 " + uploadOptions.enforceType;
                    break;
                  case "enforceLength":
                    $scope.uploadErrMsg = "文件个数不能超过 " + uploadOptions.enforceLength + " 个";
                    break;
                  case "enforceMaxFileSize":
                    $scope.uploadErrMsg = "文件大小不能超过 " + (uploadOptions.enforceMaxFileSize /1024).toFixed(2) + " kb";
                    break;
                }
                console.info('onWhenAddingFileFailed', item, filter, options);
              };

              uploader.onAfterAddingFile = function (fileItem) {
                clearMsg();
              };
              uploader.onAfterAddingAll = function (addedFileItems) {
                console.info('onAfterAddingAll', addedFileItems);
              };
              uploader.onBeforeUploadItem = function (item) {
                console.info('onBeforeUploadItem', item);
              };
              uploader.onProgressItem = function (fileItem, progress) {
                console.info('onProgressItem', fileItem, progress);
              };
              uploader.onProgressAll = function (progress) {
                console.info('onProgressAll', progress);
              };
              uploader.onCancelItem = function (fileItem, response, status, headers) {
                console.info('onCancelItem', fileItem, response, status, headers);
              };
              uploader.onCompleteItem = function (fileItem, response, status, headers) {
                console.info('onCompleteItem', fileItem, response, status, headers);
              };
            }
          });
        }
      }
    };
  });
