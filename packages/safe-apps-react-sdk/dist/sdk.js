"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeAppsSDK = void 0;
const safe_apps_sdk_1 = __importDefault(require("@gnosis.pm/safe-apps-sdk"));
const safeAppsSDK = new safe_apps_sdk_1.default();
exports.safeAppsSDK = safeAppsSDK;
//# sourceMappingURL=sdk.js.map