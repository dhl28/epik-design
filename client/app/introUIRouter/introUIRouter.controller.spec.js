'use strict';

describe('Controller: IntroUIRouterCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroUIRouterCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroUIRouterCtrl = $controller('IntroUIRouterCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
