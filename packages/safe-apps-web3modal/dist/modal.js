"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SafeAppWeb3Modal = void 0;
const safe_apps_sdk_1 = __importDefault(require("@gnosis.pm/safe-apps-sdk"));
const safe_apps_provider_1 = require("@gnosis.pm/safe-apps-provider");
const web3modal_1 = __importDefault(require("web3modal"));
class SafeAppWeb3Modal extends web3modal_1.default {
    constructor(options, sdk) {
        super(options);
        this.triedToConnect = false;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.requestProvider = async () => {
            if (await this.isSafeApp()) {
                return this.getProvider();
            }
            return this.connect();
        };
        this.sdk = sdk || new safe_apps_sdk_1.default();
    }
    async getConnectedSafe() {
        if (!this.safe && !this.triedToConnect) {
            this.safe = await Promise.race([
                this.sdk.safe.getInfo(),
                new Promise((resolve) => setTimeout(resolve, 200)),
            ]);
            this.triedToConnect = true;
        }
        return this.safe;
    }
    async getProvider() {
        if (!this.provider) {
            const safe = await this.getConnectedSafe();
            if (!safe)
                throw Error('Could not load Safe information');
            this.provider = new safe_apps_provider_1.SafeAppProvider(safe, this.sdk);
        }
        return this.provider;
    }
    async isSafeApp() {
        // check if we're in an iframe
        if ((window === null || window === void 0 ? void 0 : window.parent) === window) {
            return false;
        }
        const safe = await this.getConnectedSafe();
        return !!safe;
    }
}
exports.SafeAppWeb3Modal = SafeAppWeb3Modal;
//# sourceMappingURL=modal.js.map