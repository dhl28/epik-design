'use strict';

describe('Controller: FileStructureCtrl', function () {

  // load the controller's module
  beforeEach(module('epikDesignApp'));

  var FileStructureCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FileStructureCtrl = $controller('FileStructureCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
