'use strict';

angular.module('epikDesignApp')
  .directive('epikCustomerPicker', function ($modal, apiService, $interval) {
    return {
      templateUrl: 'components/epikCustomerPicker/epikCustomerPicker.html',
      restrict: 'EA',
      require: '?^ngModel',
      scope: {},
      link: function (scope, iElement, iAttrs, ngModelCtrl) {

        ngModelCtrl.$formatters.push(function (modelValue) {
          return modelValue;
        });

        ngModelCtrl.$parsers.push(function (viewValue) {
          return viewValue
        });

        ngModelCtrl.$render = function () {
          scope.vm = {result: []};
          _.forEach(ngModelCtrl.$viewValue, function (item) {
            apiService.getCustomer(item).then(function (data) {
              scope.vm.result.push(data);
            })
          });
        };

        ngModelCtrl.$validators.required = function (modelValue, viewValue) {
          var value = modelValue || viewValue;
          return _.isArray(value) && value.length > 0;
        }

        scope.$watchCollection('vm.result', function (newValue, oldValue) {
          if (newValue !== oldValue) {
            var value = _.pluck(newValue, "id");
            ngModelCtrl.$setViewValue(value);
          }
        });

        scope.data = {};
        scope.query = {
          pageNumber: 1,
          pageSize: 100,
          sort: 'customerNo',
          order: 'desc',
          keyword: null
        };

        scope.refresh = function (search) {
          if (!search) {
            return;
          }
          _.merge(scope.query, {
            keyword: search
          });

          apiService.getCustomers(scope.query).then(function (data) {
            scope.data.totalItems = data.recordCount;
            scope.data.datas = data.resultList;
          });
        };

        scope.fnOpenSelectModal = function () {
          var modalInstance = $modal.open({
            templateUrl: 'components/epikCustomerPicker/epikCustomerPickerModal.html',
            size: 'lg',
            resolve: {
              data: function () {
                return scope.data;
              },
              query: function () {
                return scope.query;
              },
              result: function () {
                return scope.vm.result;
              }
            },
            controller: function ($scope, $modalInstance, data, query, result) {
              $scope.data = data;
              $scope.query = query;
              $scope.result = result;

              $scope.fnCloseModal = function () {
                $modalInstance.close();
              }
              $scope.fnRemoveResult = function (id) {
                var find = _.remove($scope.result, function (item) {
                  return item.id === id;
                });
                if (find && find[0])
                  $scope.gridApi.selection.unSelectRow(find[0]);
              }

              $scope.gridOptions = {
                paginationPageSizes: [25, 50, 75],
                paginationPageSize: 25,
                useExternalPagination: true,
                useExternalSorting: true,
                multiSelect: true,
                columnDefs: [
                  {field: 'customerNo', displayName: '客户编号', cellTooltip: true},
                  {field: 'customerTypeName', displayName: '客户类型', cellTooltip: true},
                  {field: 'name', displayName: '客户名称', enableSorting: false, cellTooltip: true},
                  {
                    field: 'createdDate',
                    displayName: '创建日期',
                    cellTooltip: true,
                    type: 'date',
                    cellFilter: 'date:\'yyyy-MM-dd\''
                  },
                  {field: 'identityTypeName', displayName: '证件类型', cellTooltip: true},
                  {field: 'identityNumber', displayName: '证件号码', cellTooltip: true},
                  {field: 'industryName', displayName: '行业', cellTooltip: true}
                ],
                onRegisterApi: function (gridApi) {
                  $scope.gridApi = gridApi;

                  $interval(function () {
                    $scope.gridApi.core.handleWindowResize();
                  }, 10, 500);

                  $scope.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                    if (sortColumns.length == 0) {
                      $scope.query.sort = null;
                      $scope.query.order = null;
                    } else {
                      $scope.query.sort = sortColumns[0].name;
                      $scope.query.order = sortColumns[0].sort.direction;
                    }
                    getPage();
                  });

                  gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
                    $scope.query.pageNumber = newPage;
                    $scope.query.pageSize = pageSize;
                    getPage();
                  });
                  gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                    var find = _.find($scope.result, function (item) {
                      return item.id === row.entity.id;
                    });
                    if (row.isSelected && !find) {
                      $scope.result.push(row.entity);
                    } else if (!row.isSelected && find) {
                      _.remove($scope.result, function (item) {
                        return item.id === find.id;
                      })
                    }
                  });
                }
              };

              function selectRows() {
                _.forEach($scope.result, function (item) {
                  var find = _.find($scope.data.datas, function (item1) {
                    return item.id === item1.id;
                  })
                  if (find) {
                    $scope.gridApi.selection.selectRow(find);
                  }
                });
              }

              function getPage() {
                apiService.getPagedCustomers($scope.query).then(function (data) {
                  $scope.data.totalItems = data.recordCount;
                  $scope.data.datas = data.resultList;
                  $scope.gridOptions.totalItems = data.recordCount;
                  $scope.gridOptions.data = data.resultList;
                  $scope.gridApi.grid.modifyRows($scope.gridOptions.data);
                  selectRows();
                });
              }

              if ($scope.query.keyword) {
                getPage();
              }

              $scope.$watch('query.keyword', function (newVal, oldVal) {
                if (newVal !== oldVal) {
                  getPage();
                }
              });
            }
          });
          modalInstance.rendered.then(function () {
            Metronic.initSlimScroll($("#resultTable"));
          })
        }
      }
    };
  });
