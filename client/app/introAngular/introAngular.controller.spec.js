'use strict';

describe('Controller: IntroAngularCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroAngularCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroAngularCtrl = $controller('IntroAngularCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
