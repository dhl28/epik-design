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
      .state('main.component.widget.form', {
        url: '/form',
        templateUrl: 'app/component/comForm/comForm.html',
        controller: 'ComFormCtrl',
        ncyBreadcrumb: {
          label: '表单'
        }
      })
      .state('main.component.widget.checkbox', {
        url: '/checkbox',
        templateUrl: 'app/component/comForm/comCheckbox/comCheckbox.html',
        controller: 'ComCheckboxCtrl',
        ncyBreadcrumb: {
          label: 'checkbox 多选框'
        }
      });
  });
