'use strict';

describe('Controller: ComDisplayCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComDisplayCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComDisplayCtrl = $controller('ComDisplayCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
