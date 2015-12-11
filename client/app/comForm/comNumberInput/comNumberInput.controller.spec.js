'use strict';

describe('Controller: ComNumberInputCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComNumberInputCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComNumberInputCtrl = $controller('ComNumberInputCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
