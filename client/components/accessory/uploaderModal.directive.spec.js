'use strict';

describe('Directive: uploaderModal', function () {

  // load the directive's module and view
  beforeEach(module('epikApp'));
  beforeEach(module('components/uploaderModal/uploaderModal.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<uploader-modal></uploader-modal>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the uploaderModal directive');
  }));
});