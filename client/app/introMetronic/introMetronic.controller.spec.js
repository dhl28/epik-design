'use strict';

describe('Controller: IntroMetronicCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroMetronicCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroMetronicCtrl = $controller('IntroMetronicCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
