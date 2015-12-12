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
      })
      .state('main.component.widget.form.numberinput', {
        url: '/numberinput',
        templateUrl: 'app/comForm/comNumberInput/comNumberInput.html',
        controller: 'ComNumberInputCtrl',
        ncyBreadcrumb: {
          label: 'numberinput 数字输入框'
        }
      })
      .state('main.component.widget.form.select', {
        url: '/select',
        templateUrl: 'app/comForm/comSelect/comSelect.html',
        controller: 'ComSelectCtrl',
        ncyBreadcrumb: {
          label: 'select 选择器'
        }
      })
      .state('main.component.widget.form.datepicker', {
        url: '/datepicker',
        templateUrl: 'app/comForm/comDatepicker/comDatepicker.html',
        controller: 'ComDatepickerCtrl',
        ncyBreadcrumb: {
          label: 'datepicker 日期选择器'
        }
      })
      .state('main.component.widget.form.radiobutton', {
        url: '/radiobutton',
        templateUrl: 'app/comForm/comRadioButton/comRadioButton.html',
        controller: 'ComRadioButtonCtrl',
        ncyBreadcrumb: {
          label: 'radiobutton 单选框'
        }
      })
      .state('main.component.widget.form.formvalidate', {
        url: '/formvalidate',
        templateUrl: 'app/comForm/comFormValidate/comFormValidate.html',
        controller: 'ComFormValidateCtrl',
        ncyBreadcrumb: {
          label: 'formvalidate 表单验证'
        }
      });


  });
