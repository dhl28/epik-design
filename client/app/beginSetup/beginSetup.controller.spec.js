'use strict';

describe('Controller: BeginSetupCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var BeginSetupCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BeginSetupCtrl = $controller('BeginSetupCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
