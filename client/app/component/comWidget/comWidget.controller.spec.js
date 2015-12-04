'use strict';

describe('Controller: ComWidgetCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComWidgetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComWidgetCtrl = $controller('ComWidgetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
