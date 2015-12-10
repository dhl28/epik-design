'use strict';

var _ = require('lodash'),
  epikRP = require('../../components/epik-request-promise');

exports.getPagedCustomers = function (pageNumber, pageSize) {
  return epikRP.get({
    uri: 'http://172.30.0.161:9200/gbp/customer/v1/customer/list',
    qs: {
      flag: 1,
      pg: pageNumber,
      pz: pageSize
    },
    json: true
  });
}
