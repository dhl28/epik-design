'use strict';

describe('Service: accessory', function () {

  // load the service's module
  beforeEach(module('epikApp'));

  // instantiate service
  var accessory;
  beforeEach(inject(function (_accessory_) {
    accessory = _accessory_;
  }));

  it('should do something', function () {
    expect(!!accessory).toBe(true);
  });

});
