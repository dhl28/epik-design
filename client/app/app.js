'use strict';

angular.module('epikDesignApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ncy-angular-breadcrumb',
  'checklist-model',
  'ui.grid',
  'ui.grid.pagination',
  'ui.grid.selection',
  'fcsa-number'
])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, fcsaNumberConfigProvider) {
    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);

    fcsaNumberConfigProvider.setDefaultOptions({
      thousandsSeparator: ',',
      decimalMark: '.',
      maxDecimals: 2,
      preventInvalidInput: true
    });
  })

  .run(["$rootScope", "settings", "$state", "i18nService", function ($rootScope, settings, $state, i18nService) {
    $rootScope.$state = $state; // state to be accessed from view
    i18nService.setCurrentLang('zh-cn');
  }])


