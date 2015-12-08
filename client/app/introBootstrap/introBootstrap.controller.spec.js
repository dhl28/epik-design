'use strict';

describe('Controller: IntroBootstrapCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroBootstrapCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroBootstrapCtrl = $controller('IntroBootstrapCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
