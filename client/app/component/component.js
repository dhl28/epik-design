'use strict';

angular.module('epikDesignApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.component', {
        url: '^/component',
        templateUrl: 'app/component/component.html',
        controller: 'ComponentCtrl',
        ncyBreadcrumb: {
          label: '控件'
        }
      })
      .state('main.component.widget', {
        url: '/widget',
        templateUrl: 'app/component/comWidget/comWidget.html',
        controller: 'ComWidgetCtrl',
        ncyBreadcrumb: {
          label: '组件'
        }
      })
  });
