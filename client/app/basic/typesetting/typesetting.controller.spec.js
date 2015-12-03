'use strict';

describe('Controller: TypesettingCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var TypesettingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TypesettingCtrl = $controller('TypesettingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
