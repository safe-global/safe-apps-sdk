"use strict";
exports.__esModule = true;
exports.generateRequestId = void 0;
var generateRequestId = function () {
    if (typeof window !== 'undefined') {
        return window === null || window === void 0 ? void 0 : window.performance.now().toString(36);
    }
    return new Date().getTime().toString(36);
};
exports.generateRequestId = generateRequestId;
