'use strict';

var express = require('express'),
  controller = require('./customer.controller'),
  apiHandler = require('../../components/epik-api-handler'),
  router = express.Router();

router.get('/paged-customers', function (req, res, next) {
  var pageNumber = req.query.pageNumber,
    pageSize = req.query.pageSize,
    sort = req.query.sort,
    order = req.query.order;

  controller.getPagedCustomers(pageNumber, pageSize, sort, order).then(function (body) {
    var result = apiHandler(body);
    if ('error' in result) {
      next(result.error);
    } else {
      res.json(result.data);
    }
  }).catch(function (err) {
    next({
      code: -3,
      name: "请求应用服务器异常",
      message: err.message
    });
  });
});

module.exports = router;
