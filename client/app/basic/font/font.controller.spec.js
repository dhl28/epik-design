'use strict';

describe('Controller: FontCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var FontCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FontCtrl = $controller('FontCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
