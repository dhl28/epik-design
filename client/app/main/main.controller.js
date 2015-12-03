'use strict';

angular.module('epikDesignApp')
  .factory('settings', function ($rootScope) {
    var settings = {
      layout: {
        pageSidebarClosed: false, // sidebar state
        pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
      },
      layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
      layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
    };

    $rootScope.settings = settings;
    return settings;
  })

  .directive('ngSpinnerBar', function ($rootScope) {
    return {
      link: function (scope, element, attrs) {
        // by defult hide the spinner bar
        element.addClass('hide'); // hide spinner bar by default

        // display the spinner bar whenever the route changes(the content part started loading)
        $rootScope.$on('$stateChangeStart', function () {
          element.removeClass('hide'); // show spinner bar
        });

        // hide the spinner bar on rounte change success(after the content loaded)
        $rootScope.$on('$stateChangeSuccess', function () {
          element.addClass('hide'); // hide spinner bar
          $('body').removeClass('page-on-load'); // remove page loading indicator
          Layout.setSidebarMenuActiveLink('match'); // activate selected link in the sidebar menu

          // auto scorll to page top
          setTimeout(function () {
            Metronic.scrollTop(); // scroll to the top on content load
          }, $rootScope.settings.layout.pageAutoScrollOnLoad);
        });

        // handle errors
        $rootScope.$on('$stateNotFound', function () {
          element.addClass('hide'); // hide spinner bar
        });

        // handle errors
        $rootScope.$on('$stateChangeError', function () {
          element.addClass('hide'); // hide spinner bar
        });
      }
    };
  })

  .directive('dropdownMenuHover', function () {
    return {
      link: function (scope, elem) {
        elem.dropdownHover();
      }
    };
  })

  .controller('MainCtrl', function ($scope, $http) {
    $scope.$on('$viewContentLoaded', function () {
      Metronic.initComponents(); // init core components
      //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });
  })

  .controller('HeaderCtrl', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
      Layout.initHeader(); // init header
    });
  }])

  .controller('SidebarCtrl', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
      Layout.initSidebar(); // init sidebar
    });
  }])

  .controller('PageHeadCtrl', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
      Demo.init(); // init theme panel
    });
  }])

  .controller('FooterCtrl', ['$scope', function ($scope) {
    $scope.$on('$includeContentLoaded', function () {
      Layout.initFooter(); // init footer
    });
  }]);
