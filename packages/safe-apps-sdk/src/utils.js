"use strict";
exports.__esModule = true;
exports.getSDKVersion = void 0;
var package_json_1 = require("../package.json");
// Slice is needed for versions like '1.0.0-beta.0'
var getSDKVersion = function () { return package_json_1["default"].version.slice(0, 5); };
exports.getSDKVersion = getSDKVersion;
