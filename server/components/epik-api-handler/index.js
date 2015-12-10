/**
 * Created by YanJia on 2015/12/10.
 */
var _ = require("lodash");

var epikApiHandler = function (result) {
  var data = {};
  console.log(result);
  if (result["resultCode"] === "0000" || result["resultCode"] === 0 || result["resultCode"] === "0") {
    return {
      data: result["data"]
    };
  } else if (_.contains(result["resultCode"], "BIZ-ERR")) {
    return {
      error: {
        status: -1,
        name: "数据异常",
        message: result["bizResultMessage"]
      }
    };
  } else {
    return {
      error: {
        status: -2,
        name: "请求远程服务器异常",
        message: result["resultMessage"]
      }
    };
  }
}

module.exports = epikApiHandler;
