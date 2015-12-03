'use strict';

angular.module('epikDesignApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.basic', {
        url: '^/basic',
        templateUrl: 'app/basic/basic.html',
        controller: 'BasicCtrl',
        ncyBreadcrumb: {
          label: '基础'
        }
      })
      .state('main.basic.design', {
        url: '/design',
        templateUrl: 'app/basic/design.html',
        controller: 'DesignCtrl',
        ncyBreadcrumb: {
          label: '设计'
        }
      })
      .state('main.basic.design.font', {
        url: '/font',
        templateUrl: 'app/basic/font/font.html',
        controller: 'FontCtrl',
        ncyBreadcrumb: {
          label: '字体'
        }
      })
      .state('main.basic.design.typesetting', {
        url: '/font',
        templateUrl: 'app/basic/typesetting/typesetting.html',
        controller: 'TypesettingCtrl',
        ncyBreadcrumb: {
          label: '排版'
        }
      });
  });
