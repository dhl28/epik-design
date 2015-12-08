'use strict';

describe('Controller: IntroBowerCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroBowerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroBowerCtrl = $controller('IntroBowerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
