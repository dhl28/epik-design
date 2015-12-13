'use strict';

var _ = require('lodash');
var Accessories = require('./accessories.model');
var archiver = require('archiver');

exports.upload = function (req, res) {

  Accessories.transportToCM(req.file).then(
    function (body) {
      res.json(body);
    }
  ).catch(function (err) {
      handleError(res, err)
    });
};

exports.download = function (req, res) {
  var documentId = req.query.documentId;
  var filename = req.query.filename;
  Accessories.downloadFromCM(documentId, filename).then(
    function (body) {
      res.setHeader('Content-Disposition', 'attachment;filename*=utf8\'\'' + encodeURIComponent(body.retrievalName));
      res.setHeader('Content-Type', body.contentType);
      res.end(new Buffer(body.content, 'base64'), 'binary');
    }
  ).catch(function (err) {
      handleError(res, err)
    });
};

exports.downloadpack = function(req, res) {
  var documentIds = req.query.documentIds;
  Accessories.downloadPackedFile(documentIds).then(function(data) {
    var archive = archiver('zip');
    res.attachment('archive-' + Date.now() + '.zip');
    archive.pipe(res);
    _.forEach(data, function(file) {
      archive.append(new Buffer(file["content"], 'base64'), { name: file["retrievalName"] })
    });
    archive.finalize();
    archive.on('error', function(err) {
      res.status(500).send({error: err.message});
    });
    res.on('close', function() {
      return res.status(200).send('OK').end();
    });
  }).catch(function (err) {
    handleError(res, err)
  });
}

exports.documentFileList = function(req, res) {
  var documentIdList = req.query.documentIdList;
  Accessories.getDocumentFileListFromCM(new Array().concat(documentIdList)).then(function(data) {
    var files = {};
    _.forEach(data, function(d) {
      _.merge(files, d);
    })
    res.json(files);
  }).catch(function (err) {
    handleError(res, err)
  });
}

function handleError(res, err) {
  console.log(err);
  return res.send(500, err);
}
