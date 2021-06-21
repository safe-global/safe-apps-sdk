"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeAppConnector = void 0;
const abstract_connector_1 = require("@web3-react/abstract-connector");
const safe_apps_sdk_1 = __importDefault(require("@gnosis.pm/safe-apps-sdk"));
const safe_apps_provider_1 = require("@gnosis.pm/safe-apps-provider");
class SafeAppConnector extends abstract_connector_1.AbstractConnector {
    constructor() {
        super(...arguments);
        this.sdk = new safe_apps_sdk_1.default();
    }
    async activate() {
        const runningAsSafeApp = await this.isSafeApp();
        if (!runningAsSafeApp) {
            throw new Error('The app is loaded outside safe context');
        }
        return { provider: await this.getProvider(), chainId: await this.getChainId(), account: await this.getAccount() };
    }
    async getSafeInfo() {
        if (!this.safe) {
            this.safe = await this.sdk.safe.getInfo();
        }
        return this.safe;
    }
    async getProvider() {
        if (!this.provider) {
            const safe = await this.getSafeInfo();
            this.provider = new safe_apps_provider_1.SafeAppProvider(safe, this.sdk);
        }
        return this.provider;
    }
    async getChainId() {
        const provider = await this.getProvider();
        return provider.chainId;
    }
    async getAccount() {
        const safe = await this.getSafeInfo();
        return safe.safeAddress;
    }
    deactivate() {
        return;
    }
    async isSafeApp() {
        const safe = await Promise.race([
            this.getSafeInfo(),
            new Promise((resolve) => setTimeout(resolve, 300)),
        ]);
        return !!safe;
    }
}
exports.SafeAppConnector = SafeAppConnector;
//# sourceMappingURL=connector.js.map