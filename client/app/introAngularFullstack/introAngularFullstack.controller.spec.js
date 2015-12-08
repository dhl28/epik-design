'use strict';

describe('Controller: IntroAngularFullstackCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var IntroAngularFullstackCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    IntroAngularFullstackCtrl = $controller('IntroAngularFullstackCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
