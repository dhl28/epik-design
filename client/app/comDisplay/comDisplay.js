'use strict';

angular.module('epikDesignApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.component.widget.display', {
        url: '/display',
        templateUrl: 'app/comDisplay/comDisplay.html',
        controller: 'ComDisplayCtrl',
        ncyBreadcrumb: {
          label: '展示'
        }
      })
      .state('main.component.widget.display.grid', {
        url: '/grid',
        templateUrl: 'app/comDisplay/comGrid/comGrid.html',
        controller: 'ComGridCtrl',
        ncyBreadcrumb: {
          label: 'grid 表格'
        }
      });
  });
