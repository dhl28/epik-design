'use strict';

angular.module('epikDesignApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main.guide', {
        url: '^/guide',
        templateUrl: 'app/guide/guide.html',
        controller: 'GuideCtrl',
        ncyBreadcrumb: {
          label: '结构和使用'
        }
      })
      .state('main.guide.fileStructure', {
        url: '/fileStructure',
        templateUrl: 'app/fileStructure/fileStructure.html',
        controller: 'FileStructureCtrl',
        ncyBreadcrumb: {
          label: '文件结构'
        }
      })
      .state('main.guide.introExpress', {
        url: '/introExpress',
        templateUrl: 'app/introExpress/introExpress.html',
        controller: 'IntroExpressCtrl',
        ncyBreadcrumb: {
          label: '使用 express'
        }
      })
      .state('main.guide.introAngular', {
        url: '/introAngular',
        templateUrl: 'app/introAngular/introAngular.html',
        controller: 'IntroAngularCtrl',
        ncyBreadcrumb: {
          label: '使用 angular'
        }
      })
      .state('main.guide.introAngularFullstack', {
        url: '/introAngularFullstack',
        templateUrl: 'app/introAngularFullstack/introAngularFullstack.html',
        controller: 'IntroAngularFullstackCtrl',
        ncyBreadcrumb: {
          label: '使用 angular-fullstack'
        }
      })
      .state('main.guide.introBootstrap', {
        url: '/introBootstrap',
        templateUrl: 'app/introBootstrap/introBootstrap.html',
        controller: 'IntroBootstrapCtrl',
        ncyBreadcrumb: {
          label: '使用 bootstrap'
        }
      })
      .state('main.guide.introMetronic', {
        url: '/introMetronic',
        templateUrl: 'app/introMetronic/introMetronic.html',
        controller: 'IntroMetronicCtrl',
        ncyBreadcrumb: {
          label: '使用 Metronic'
        }
      })
      .state('main.guide.introBower', {
        url: '/introBower',
        templateUrl: 'app/introBower/introBower.html',
        controller: 'IntroBowerCtrl',
        ncyBreadcrumb: {
          label: '使用 Bower'
        }
      })
      .state('main.guide.introGrunt', {
        url: '/introGrunt',
        templateUrl: 'app/introGrunt/introGrunt.html',
        controller: 'IntroGruntCtrl',
        ncyBreadcrumb: {
          label: '使用 Grunt'
        }
      })
  });
