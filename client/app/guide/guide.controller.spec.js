'use strict';

describe('Controller: GuideCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var GuideCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    GuideCtrl = $controller('GuideCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
