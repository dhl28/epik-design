'use strict';

describe('Controller: ComCheckboxCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComCheckboxCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComCheckboxCtrl = $controller('ComCheckboxCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
