'use strict';

describe('Controller: ComDatepickerCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComDatepickerCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComDatepickerCtrl = $controller('ComDatepickerCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
