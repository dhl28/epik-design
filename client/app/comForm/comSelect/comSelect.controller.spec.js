'use strict';

describe('Controller: ComSelectCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComSelectCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComSelectCtrl = $controller('ComSelectCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
