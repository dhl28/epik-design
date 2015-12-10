'use strict';

describe('Controller: ComGridCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComGridCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComGridCtrl = $controller('ComGridCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
