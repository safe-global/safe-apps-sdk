"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageFormatter = void 0;
const version_js_1 = require("../version.js");
const utils_js_1 = require("./utils.js");
class MessageFormatter {
}
exports.MessageFormatter = MessageFormatter;
MessageFormatter.makeRequest = (method, params) => {
    const id = (0, utils_js_1.generateRequestId)();
    return {
        id,
        method,
        params,
        env: {
            sdkVersion: (0, version_js_1.getSDKVersion)(),
        },
    };
};
MessageFormatter.makeResponse = (id, data, version) => ({
    id,
    success: true,
    version,
    data,
});
MessageFormatter.makeErrorResponse = (id, error, version) => ({
    id,
    success: false,
    error,
    version,
});
//# sourceMappingURL=messageFormatter.js.map