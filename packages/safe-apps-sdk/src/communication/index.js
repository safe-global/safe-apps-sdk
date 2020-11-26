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
var semver_1 = require("semver");
var messageFormatter_1 = require("./messageFormatter");
var PostMessageCommunicator = /** @class */ (function () {
    function PostMessageCommunicator(allowedOrigins) {
        var _this = this;
        if (allowedOrigins === void 0) { allowedOrigins = null; }
        this.allowedOrigins = null;
        this.callbacks = new Map();
        this.isValidMessage = function (_a) {
            var origin = _a.origin, data = _a.data, source = _a.source;
            var emptyOrMalformed = !data;
            var sentFromParentEl = source === window.parent;
            var allowedSDKVersion = typeof data.version !== 'undefined' ? semver_1["default"].gte(data.version, '1.0.0') : false;
            var validOrigin = true;
            if (Array.isArray(_this.allowedOrigins)) {
                validOrigin = _this.allowedOrigins.find(function (regExp) { return regExp.test(origin); }) !== undefined;
            }
            return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
        };
        this.logIncomingMessage = function (msg) {
            console.info("Safe Apps SDK v1: A message was received from origin " + msg.origin + ". ", msg.data);
        };
        this.onParentMessage = function (msg) {
            if (_this.isValidMessage(msg)) {
                _this.logIncomingMessage(msg);
                _this.handleIncomingMessage(msg.data);
            }
        };
        this.handleIncomingMessage = function (payload) {
            var id = payload.id;
            var cb = _this.callbacks.get(id);
            if (cb) {
                cb(payload);
                _this.callbacks["delete"](id);
            }
        };
        this.send = function (method, params) {
            var request = messageFormatter_1.MessageFormatter.makeRequest(method, params);
            if (typeof window === 'undefined') {
                throw new Error("Window doesn't exist");
            }
            window.parent.postMessage(request, '*');
            return new Promise(function (resolve) {
                _this.callbacks.set(request.id, function (response) {
                    resolve(response);
                });
            });
        };
        this.allowedOrigins = allowedOrigins;
        window.addEventListener('message', this.onParentMessage);
    }
    return PostMessageCommunicator;
}());
exports["default"] = PostMessageCommunicator;
__exportStar(require("./methods"), exports);
