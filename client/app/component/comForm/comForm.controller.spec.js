  'use strict';

describe('Controller: ComFormCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComFormCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComFormCtrl = $controller('ComFormCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
