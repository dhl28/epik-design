'use strict';

angular.module('epikDesignApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.setup', {
        url: '^/setup',
        templateUrl: 'app/setup/setup.html',
        controller: 'SetupCtrl',
        ncyBreadcrumb: {
          label: '获取和安装'
        }
      })
      .state('main.setup.basicsoft', {
        url: '/basicsoft',
        templateUrl: 'app/basicSoft/basicSoft.html',
        controller: 'BasicSoftCtrl',
        ncyBreadcrumb: {
          label: '安装环境'
        }
      })
      .state('main.setup.beginsetup', {
        url: '/beginsetup',
        templateUrl: 'app/beginSetup/beginSetup.html',
        controller: 'BeginSetupCtrl',
        ncyBreadcrumb: {
          label: '安装项目'
        }
      })
      .state('main.setup.launch', {
        url: '/beginsetup',
        templateUrl: 'app/launch/launch.html',
        controller: 'LaunchCtrl',
        ncyBreadcrumb: {
          label: '启动项目'
        }
      })
  });
