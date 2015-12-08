'use strict';

describe('Controller: IntroExpressCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroExpressCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroExpressCtrl = $controller('IntroExpressCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
