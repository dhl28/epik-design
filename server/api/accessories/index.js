'use strict';

var express = require('express');
var controller = require('./accessories.controller');
var multer = require('multer');
var router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  },
  limits: {
    fileSize: 10000
  },
  fileFilter: function (req, file, cb) {
    cb(null, true);
  },
  onFileUploadStart: function (file) {
    console.log("upload start");
  },
  onFileUploadComplete: function (file) {
    console.log("upload complete");
  }
});
var upload = multer({storage: storage});

router.use(upload.single("file"));
router.get('/documentfilelist', controller.documentFileList);
router.post('/upload', controller.upload);
router.get('/download', controller.download);
router.get('/downloadpack', controller.downloadpack);
module.exports = router;
