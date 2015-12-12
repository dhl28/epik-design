'use strict';

describe('Controller: ComFormValidateCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComFormValidateCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComFormValidateCtrl = $controller('ComFormValidateCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
