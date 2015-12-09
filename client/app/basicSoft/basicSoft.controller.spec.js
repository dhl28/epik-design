'use strict';

describe('Controller: BasicSoftCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var BasicSoftCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BasicSoftCtrl = $controller('BasicSoftCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
