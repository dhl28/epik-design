'use strict';

angular.module('epikDesignApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngMessages',
  'ngAnimate',
  'ui.router',
  'ui.bootstrap',
  'ncy-angular-breadcrumb',
  'checklist-model',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.selection',
  'fcsa-number',
  'ui.select'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, fcsaNumberConfigProvider, uiSelectConfig, datepickerConfig, datepickerPopupConfig) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    fcsaNumberConfigProvider.setDefaultOptions({
      thousandsSeparator: ',',
      decimalMark: '.',
      maxDecimals: 2,
      preventInvalidInput: true
    });

    uiSelectConfig.theme = 'bootstrap';

    datepickerConfig.minDate = new Date(1900, 1, 1);
    datepickerConfig.maxDate = new Date(2100, 1, 1);
    datepickerConfig.formatData = 'dd';
    datepickerConfig.formatMonth = 'MMM';
    datepickerConfig.formatYear = 'yyyy';
    datepickerConfig.formatDayHeader = 'EEE';
    datepickerConfig.formatDayTitle = 'yyyy-MM';
    datepickerPopupConfig.currentText = '今天';
    datepickerPopupConfig.clearText = '清除';
    datepickerPopupConfig.closeText = '关闭';
    datepickerPopupConfig.datepickerAppendToBody = true;
  })

  .run(["$rootScope", "settings", "$state", "i18nService", function ($rootScope, settings, $state, i18nService) {
    $rootScope.$state = $state; // state to be accessed from view
    i18nService.setCurrentLang('zh-cn');
  }])


