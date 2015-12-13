'use strict';

var config = require('../../config/environment'),
  xpath = require('xpath'),
  dom = require('xmldom').DOMParser,
  Q = require('q'),
  fs = require('fs'),
  ws = require('ws.js'), Http = ws.Http,
  _ = require('lodash');

function readFile(filePath) {
  var deferred = Q.defer();
  fs.readFile(filePath, function (err, data) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(data);
    }
  });
  return deferred.promise;
}

function trasportToCM(file, data) {
  var deferred = Q.defer();
  var requestXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" ' +
    'xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" ' +
    'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    ' <soapenv:Header>' +
    '   <Security xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '     <hd:UsernameToken xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '       <hd:Username>' + config.cm.userName + '</hd:Username>' +
    '       <hd:Password>' + config.cm.password + '</hd:Password>' +
    '     </hd:UsernameToken>' +
    '   </Security>' +
    '   <Localization xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '     <hd:Locale xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">zh_CN</hd:Locale>' +
    '   </Localization>' +
    ' </soapenv:Header>' +
    ' <soapenv:Body>' +
    '   <p857:ExecuteChangesRequest refresh="1" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '     <p857:ChangeRequest>' +
    '       <p857:TargetSpecification classId="ObjectStore" objectId="CreditPlatForm" serializationDuplicate="0"/>' +
    '       <p857:Action xsi:type="p857:CreateAction" classId="Document" autoUniqueContainmentName="1" defineSecurityParentage="0" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema"/>' +
    '       <p857:ActionProperties xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '         <p857:Property xsi:type="p857:SingletonString" propertyId="DocumentTitle" settable="0">' +
    '           <p857:Value>' + file.originalname + '</p857:Value>' +
    '         </p857:Property>' +
    '         <p857:Property xsi:type="p857:ListOfObject" propertyId="ContentElements" settable="0">' +
    '           <p857:Value classId="ContentTransfer" serializationDuplicate="0" updateSequenceNumber="0" accessAllowed="0" originalIndex="0" newIndex="0" dependentAction="Insert">' +
    '             <p857:Property xsi:type="p857:SingletonString" propertyId="ContentType" settable="0">' +
    '               <p857:Value>' + file.mimetype + '</p857:Value>' +
    '             </p857:Property>' +
    '             <p857:Property xsi:type="p857:SingletonString" propertyId="RetrievalName" settable="0">' +
    '               <p857:Value>' + file.originalname + '</p857:Value>' +
    '             </p857:Property>' +
    '             <p857:Property xsi:type="p857:ContentData" propertyId="Content" settable="0">' +
    '               <p857:Value xsi:type="p857:InlineContent"><p857:Binary>' + data.toString('base64') + '</p857:Binary></p857:Value>' +
    '             </p857:Property>' +
    '           </p857:Value>' +
    '         </p857:Property>' +
    '       </p857:ActionProperties>' +
    '       <p857:RefreshFilter maxRecursion="0" maxElements="0" levelDependents="0" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '         <p857:ExcludeProperties>DateCreated</p857:ExcludeProperties>' +
    '         <p857:ExcludeProperties>DateLastModified</p857:ExcludeProperties>' +
    '       </p857:RefreshFilter>' +
    '     </p857:ChangeRequest>' +
    '   </p857:ExecuteChangesRequest>' +
    ' </soapenv:Body>' +
    '</soapenv:Envelope>';

  ws.send([new Http()], {
    request: requestXML,
    url: config.cm.url,
    contentType: "txt/plain"
  }, function (ctx) {
    deferred.resolve(ctx.response);
  });

  return deferred.promise;
}

function restoreCM(file, objectId) {
  var deferred = Q.defer();
  var requestXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    ' <soapenv:Header>' +
    '   <Security xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '     <hd:UsernameToken xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '      <hd:Username>' + config.cm.userName + '</hd:Username>' +
    '      <hd:Password>' + config.cm.password + '</hd:Password>' +
    '     </hd:UsernameToken>' +
    '   </Security>' +
    '   <Localization xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '     <hd:Locale xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">zh_CN</hd:Locale>' +
    '   </Localization>' +
    ' </soapenv:Header>' +
    ' <soapenv:Body>' +
    '   <p857:ExecuteChangesRequest refresh="0" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '     <p857:ChangeRequest id="1" updateSequenceNumber="0">' +
    '       <p857:TargetSpecification classId="ObjectStore" objectId="CreditPlatForm" serializationDuplicate="0"/>' +
    '       <p857:Action xsi:type="p857:CreateAction" classId="ReferentialContainmentRelationship" autoUniqueContainmentName="1" defineSecurityParentage="0" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema"/>' +
    '       <p857:ActionProperties xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '         <p857:Property xsi:type="p857:SingletonObject" propertyId="Tail" settable="0">' +
    '           <p857:Value xsi:type="p857:ObjectReference" classId="Folder" objectId="' + config.cm.path + '" objectStore="CreditPlatForm" serializationDuplicate="0"/>' +
    '         </p857:Property>' +
    '         <p857:Property xsi:type="p857:SingletonObject" propertyId="Head" settable="0">' +
    '           <p857:Value xsi:type="p857:ObjectReference" classId="Document" objectId="' + objectId + '" objectStore="CreditPlatForm" serializationDuplicate="0"/>' +
    '         </p857:Property>' +
    '         <p857:Property xsi:type="p857:SingletonString" propertyId="ContainmentName" settable="0">' +
    '           <p857:Value>' + file.originalname + '</p857:Value>' +
    '         </p857:Property>' +
    '       </p857:ActionProperties>' +
    '     </p857:ChangeRequest>' +
    '   </p857:ExecuteChangesRequest>' +
    ' </soapenv:Body>' +
    '</soapenv:Envelope>';

  ws.send([new Http()], {
    request: requestXML,
    url: config.cm.url,
    contentType: "txt/plain"
  }, function (ctx) {
    deferred.resolve(ctx.response);
  });

  return deferred.promise;
}

function removeTempFile(filePath) {
  var deferred = Q.defer();
  fs.unlink(filePath, function (err, data) {
    if (err) {
      deferred.reject(err);
    } else {
      deferred.resolve(data);
    }
  });
  return deferred.promise;
}

function parseUploadResponseXML(data) {
  var deferred = Q.defer();
  var doc = new dom().parseFromString(data);
  var select = xpath.useNamespaces({"e": "http://www.filenet.com/ns/fnce/2006/11/ws/schema"});
  var data = select("//e:ChangeResponse/@objectId", doc);
  var objectId = data[0].value.replace('{', '').replace('}', '');
  deferred.resolve(objectId);
  return deferred.promise;
}

function parseDownloadResponseXML(data, filename) {
  var deferred = Q.defer(), retrievalName = null, content = null, contentType = null ;
  var doc = new dom().parseFromString(data);
  var select = xpath.useNamespaces({"e": "http://www.filenet.com/ns/fnce/2006/11/ws/schema"});
  var objNodes = select("//e:Object", doc);

  _.forEach(objNodes, function(objNode, i) {
    retrievalName = select("//e:Object["+(i+1)+"]/e:Property[@propertyId='RetrievalName']/e:Value/text()", doc)[0]["nodeValue"];

    if (retrievalName === filename) {
      content = select("//e:Object["+(i+1)+"]/e:Property[@propertyId='Content']/e:Value/e:Binary/text()", doc)[0]["nodeValue"];
      contentType = select("//e:Object["+(i+1)+"]/e:Property[@propertyId='ContentType']/e:Value/text()", doc)[0]["nodeValue"];
      return false;
    }
  });
  deferred.resolve({
    retrievalName : retrievalName,
    contentType : contentType,
    content : content
  });
  return deferred.promise;
}

function downloadFromCM(documentId) {
  var deferred = Q.defer();
  var requestXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    '<soapenv:Header>' +
    '<Security xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:UsernameToken xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:Username>' + config.cm.userName + '</hd:Username>' +
    '<hd:Password>' + config.cm.password + '</hd:Password>' +
    '</hd:UsernameToken>' +
    '</Security>' +
    '<Localization xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:Locale xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">zh_CN</hd:Locale>' +
    '</Localization>' +
    '</soapenv:Header>' +
    '<soapenv:Body>' +
    '<p857:GetObjectsRequest xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '<p857:ObjectRequest id="1" cacheAllowed="0" maxElements="0">' +
    '<p857:SourceSpecification xsi:type="p857:ObjectSpecification" classId="Document" objectId="{'+ documentId +'}" objectStore="CreditPlatForm" serializationDuplicate="0" propertyId="ContentElements" itemIndex="-1" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema"/>' +
    '<p857:PropertyFilter maxRecursion="0" maxElements="0" levelDependents="0" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">ContentType</p857:IncludeProperties>' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">RetrievalName</p857:IncludeProperties>' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">MimeType</p857:IncludeProperties>' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">Content</p857:IncludeProperties>' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">ContentSize</p857:IncludeProperties>' +
    '<p857:ExcludeProperties>DateCreated</p857:ExcludeProperties>' +
    '<p857:ExcludeProperties>DateLastModified</p857:ExcludeProperties>' +
    '</p857:PropertyFilter>' +
    '</p857:ObjectRequest>' +
    '</p857:GetObjectsRequest>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

  ws.send([new Http()], {
    request: requestXML,
    url: config.cm.url,
    contentType: "txt/plain"
  }, function (ctx) {
    deferred.resolve(ctx.response);
  });

  return deferred.promise;
}

function getFilesByDocumentIdFormCM(documentId) {
  var deferred = Q.defer();
  var requestXML =
    '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    '<soapenv:Header>' +
    '<Security xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:UsernameToken xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:Username>' + config.cm.userName + '</hd:Username>' +
    '<hd:Password>' + config.cm.password + '</hd:Password>' +
    '</hd:UsernameToken>' +
    '</Security>' +
    '<Localization xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:Locale xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">zh_CN</hd:Locale>' +
    '</Localization>' +
    '</soapenv:Header>' +
    '<soapenv:Body>' +
    '<p857:GetObjectsRequest xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '<p857:ObjectRequest id="1" cacheAllowed="0" maxElements="0">' +
    '<p857:SourceSpecification xsi:type="p857:ObjectSpecification" classId="Document" objectId="{'+ documentId +'}" objectStore="CreditPlatForm" serializationDuplicate="0" propertyId="ContentElements" itemIndex="-1" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema"/>' +
    '<p857:PropertyFilter maxRecursion="0" maxElements="0" levelDependents="0" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">ContentType</p857:IncludeProperties>' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">RetrievalName</p857:IncludeProperties>' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">MimeType</p857:IncludeProperties>' +
    '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">ContentSize</p857:IncludeProperties>' +
    '<p857:ExcludeProperties>DateCreated</p857:ExcludeProperties>' +
    '<p857:ExcludeProperties>DateLastModified</p857:ExcludeProperties>' +
    '</p857:PropertyFilter>' +
    '</p857:ObjectRequest>' +
    '</p857:GetObjectsRequest>' +
    '</soapenv:Body>' +
    '</soapenv:Envelope>';

  ws.send([new Http()], {
    request: requestXML,
    url: config.cm.url,
    contentType: "txt/plain"
  }, function (ctx) {
    deferred.resolve(ctx.response)
  });

  return deferred.promise;
}

function downloadMultiFromCM(documentIds) {
  var deferred = Q.defer();
  var requestXML = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:soapenc="http://schemas.xmlsoap.org/soap/encoding/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">' +
    '<soapenv:Header>' +
    '<Security xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:UsernameToken xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:Username>' + config.cm.userName + '</hd:Username>' +
    '<hd:Password>' + config.cm.password + '</hd:Password>' +
    '</hd:UsernameToken>' +
    '</Security>' +
    '<Localization xmlns="http://schemas.xmlsoap.org/ws/2002/12/secext">' +
    '<hd:Locale xmlns:hd="http://schemas.xmlsoap.org/ws/2002/12/secext">zh_CN</hd:Locale>' +
    '</Localization>' +
    '</soapenv:Header>' +
    '<soapenv:Body>' +
    '<p857:GetObjectsRequest xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">{{ObjXML}}' +
    '</p857:GetObjectsRequest>';
  var requestGetObjXML = [];
  _.forEach(documentIds, function(documentId) {
    requestGetObjXML.push(
      '<p857:ObjectRequest id="1" cacheAllowed="0" maxElements="0">' +
      '<p857:SourceSpecification xsi:type="p857:ObjectSpecification" classId="Document" objectId="{' + documentId + '}" objectStore="CreditPlatForm" serializationDuplicate="0" propertyId="ContentElements" itemIndex="-1" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema"/>' +
      '<p857:PropertyFilter maxRecursion="0" maxElements="0" levelDependents="0" xmlns:p857="http://www.filenet.com/ns/fnce/2006/11/ws/schema">' +
      '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">ContentType</p857:IncludeProperties>' +
      '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">RetrievalName</p857:IncludeProperties>' +
      '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">Content</p857:IncludeProperties>' +
      '<p857:IncludeProperties maxRecursion="1" maxElements="0" levelDependents="0">ContentSize</p857:IncludeProperties>' +
      '<p857:ExcludeProperties>DateCreated</p857:ExcludeProperties>' +
      '<p857:ExcludeProperties>DateLastModified</p857:ExcludeProperties>' +
      '</p857:PropertyFilter>' +
      '</p857:ObjectRequest>'
    );
  });
  requestXML = requestXML.replace('{{ObjXML}}', requestGetObjXML.toString());

  ws.send([new Http()], {
    request: requestXML,
    url: config.cm.url,
    contentType: "txt/plain"
  }, function (ctx) {
    deferred.resolve(ctx.response)
  });

  return deferred.promise;
}

function parseFilesInDocumentResponseXML(data, documentId) {
  var deferred = Q.defer();
  var documentFiles = {};
  var doc = new dom().parseFromString(data);
  var select = xpath.useNamespaces({"e": "http://www.filenet.com/ns/fnce/2006/11/ws/schema"});
  var objNodes = select("//e:Object", doc);

  _.forEach(objNodes, function(objNode, i) {
    documentFiles[documentId] = [];
    var contentType = select("//e:Object["+(i+1)+"]/e:Property[@propertyId='ContentType']/e:Value/text()", doc)[0]["nodeValue"];
    var retrievalName = select("//e:Object["+(i+1)+"]/e:Property[@propertyId='RetrievalName']/e:Value/text()", doc)[0]["nodeValue"];
    var contentSize = select("//e:Object["+(i+1)+"]/e:Property[@propertyId='ContentSize']/e:Value/text()", doc)[0]["nodeValue"];
    documentFiles[documentId].push({
      contentType : contentType,
      retrievalName : retrievalName,
      contentSize : contentSize
    });
  });

  deferred.resolve(documentFiles);
  return deferred.promise;
}

function getDocumentFileListFromCM(documentIdList) {
  var documentFileListFun = [], deferred = Q.defer();
  _.forEach(documentIdList, function(documentId) {
    documentFileListFun.push(getFilesByDocumentIdFormCM(documentId).then(function(data) {
      return parseFilesInDocumentResponseXML(data, documentId);
    }));
  });

  return Q.all(documentFileListFun);
}

module.exports = {

  /**
   * 上传单个文件到文档服务器
   * @param file
   * @param currentUser
   * @returns {*}
   */
  transportToCM: function (file) {
    var deferred = Q.defer(), objectId = null;

    readFile(file.path).then(function (data) {
      return trasportToCM(file, data);
    }).then(function (data) {
      return parseUploadResponseXML(data)
    }).then(function (data) {
      objectId = data;
      return restoreCM(file, data);
    }).then(function (data) {
      return removeTempFile(file.path);
    }).then(function (data) {
      deferred.resolve({
        documentId: objectId,
        filename: file.originalname
      });
    });

    return deferred.promise;
  },

  /**
   * 附件下载
   * @param documentId
   * @param currentUser
   */
  downloadFromCM: function (documentId, filename) {
    var deferred = Q.defer();
    return downloadFromCM(documentId).then(function (data) {
      return parseDownloadResponseXML(data, filename);
    });
  },

  /**
   * 下载多个附件
   * @param documentIds
   */
  downloadPackedFile : function(documentIds) {
    var deferred = Q.defer();
    var files = JSON.parse(documentIds);
    var filesGroup = _.groupBy(files, function(file) {
      return file.documentId;
    })

    var documentIds = [];
    for (var docId in filesGroup) {
      documentIds.push(docId);
    }

    var documentFileListFun = [];
    return downloadMultiFromCM(documentIds).then(function (data) {
      _.forEach(files, function(file) {
        documentFileListFun.push(parseDownloadResponseXML(data, file.retrievalName));
      })
      return Q.all(documentFileListFun)
    });
  },

  /**
   * 获取多个documentId里的文件列表
   * @param documentIds
   * @returns {*}
   */
  getDocumentFileListFromCM: function (documentIdList) {
    return getDocumentFileListFromCM(documentIdList);
  }
};
