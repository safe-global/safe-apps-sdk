"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSDKVersion = void 0;
const package_json_1 = __importDefault(require("../package.json"));
const getSDKVersion = () => {
    // Strip out version tags like `beta.0` in `1.0.0-beta.0`
    return package_json_1.default.version.split('-')[0];
};
exports.getSDKVersion = getSDKVersion;
//# sourceMappingURL=utils.js.map