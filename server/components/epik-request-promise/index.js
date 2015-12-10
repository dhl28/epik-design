/**
 * Created by YanJia on 2015/12/10.
 */
var rp = require('request-promise');

var epikRP = rp.defaults({
  headers: {
    appUserId: 'F55F9FDE-D2E6-48DD-92F6-142C1801FB3F',
    appUserName: 'luoweiyang@hanhua.com',
    sourceSystem: 'GBP-WEB'
  }
});

module.exports = epikRP;
