'use strict';

describe('Controller: ComUploadCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var ComUploadCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ComUploadCtrl = $controller('ComUploadCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
