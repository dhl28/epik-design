'use strict';

angular.module('epikDesignApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.component.widget.form', {
        url: '/form',
        templateUrl: 'app/comForm/comForm.html',
        controller: 'ComFormCtrl',
        ncyBreadcrumb: {
          label: '表单'
        }
      })
      .state('main.component.widget.form.checkbox', {
        url: '/checkbox',
        templateUrl: 'app/comForm/comCheckbox/comCheckbox.html',
        controller: 'ComCheckboxCtrl',
        ncyBreadcrumb: {
          label: 'checkbox 多选框'
        }
      });
  });
