'use strict';

describe('Controller: BasicCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var BasicCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BasicCtrl = $controller('BasicCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
