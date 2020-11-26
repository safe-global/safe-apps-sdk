"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.getSDKVersion = void 0;
var sdk_1 = require("./sdk");
exports["default"] = sdk_1["default"];
__exportStar(require("./sdk"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./communication/methods"), exports);
__exportStar(require("./communication/messageFormatter"), exports);
var utils_1 = require("./utils");
__createBinding(exports, utils_1, "getSDKVersion");
