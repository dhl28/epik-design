'use strict';

describe('Controller: ComRadioButtonCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComRadioButtonCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComRadioButtonCtrl = $controller('ComRadioButtonCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
