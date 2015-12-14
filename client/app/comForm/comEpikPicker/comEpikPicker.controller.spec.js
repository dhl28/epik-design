'use strict';

describe('Controller: ComEpikPickerCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComEpikPickerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComEpikPickerCtrl = $controller('ComEpikPickerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
