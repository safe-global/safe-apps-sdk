"use strict";
exports.__esModule = true;
exports.MessageFormatter = void 0;
var utils_1 = require("./utils");
var utils_2 = require("../utils");
var MessageFormatter = /** @class */ (function () {
    function MessageFormatter() {
    }
    MessageFormatter.makeRequest = function (method, params) {
        var id = utils_1.generateRequestId();
        return {
            id: id,
            method: method,
            params: params,
            env: {
                sdkVersion: utils_2.getSDKVersion()
            }
        };
    };
    MessageFormatter.makeResponse = function (id, data, version) { return ({
        id: id,
        success: true,
        version: version,
        data: data
    }); };
    MessageFormatter.makeErrorResponse = function (id, error, version) { return ({
        id: id,
        success: false,
        error: error,
        version: version
    }); };
    return MessageFormatter;
}());
exports.MessageFormatter = MessageFormatter;
