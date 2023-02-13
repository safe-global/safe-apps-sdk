"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObjectEIP712TypedData = exports.NativeCurrency = void 0;
var safe_gateway_typescript_sdk_1 = require("@safe-global/safe-gateway-typescript-sdk");
Object.defineProperty(exports, "NativeCurrency", { enumerable: true, get: function () { return safe_gateway_typescript_sdk_1.NativeCurrency; } });
const isObjectEIP712TypedData = (obj) => {
    return typeof obj === 'object' && obj != null && 'domain' in obj && 'types' in obj && 'message' in obj;
};
exports.isObjectEIP712TypedData = isObjectEIP712TypedData;
//# sourceMappingURL=sdk.js.map