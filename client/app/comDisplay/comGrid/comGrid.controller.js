'use strict';

angular.module('epikDesignApp')
  .controller('ComGridCtrl', function ($scope, uiGridConstants, apiService) {
    $scope.vm = {};
    $scope.vm.data1 = [
      {
        "firstName": "Cox",
        "lastName": "Carney",
        "company": "Enormo",
        "employed": true
      },
      {
        "firstName": "Lorraine",
        "lastName": "Wise",
        "company": "Comveyer",
        "employed": false
      },
      {
        "firstName": "Nancy",
        "lastName": "Waters",
        "company": "Fuelton",
        "employed": false
      }
    ];

    var pagination2Options = {
      pageNumber: 1,
      pageSize: 25,
      sort: null
    };

    $scope.grid2Options = {
      paginationPageSizes: [25, 50, 75],
      paginationPageSize: 25,
      useExternalPagination: true,
      useExternalSorting: true,
      columnDefs: [
        {field: 'customerNo', displayName: '客户编号'},
        {field: 'customerTypeName', displayName: '客户类型'},
        {field: 'name', displayName: '客户名称', enableSorting: false},
        {field: 'createdDate', displayName: '创建日期'},
        {field: 'identityTypeName', displayName: '证件类型'},
        {field: 'identityNumber', displayName: '证件号码'},
        {field: 'industryName', displayName: '行业'}
      ],
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        $scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
          if (sortColumns.length == 0) {
            pagination2Options.sort = null;
          } else {
            pagination2Options.sort = sortColumns[0].sort.direction;
          }
          getPage();
        });
        gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
          pagination2Options.pageNumber = newPage;
          pagination2Options.pageSize = pageSize;
          getPage();
        });
      }
    };

    function getPage() {
      apiService.getCustomers(pagination2Options.pageNumber, pagination2Options.pageSize).then(function(data) {
        $scope.grid2Options.totalItems = data.recordCount;
        $scope.grid2Options.data = data.resultList;
      });
    }

    getPage();
  });
