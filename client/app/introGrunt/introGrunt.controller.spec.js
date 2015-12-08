'use strict';

describe('Controller: IntroGruntCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroGruntCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroGruntCtrl = $controller('IntroGruntCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
