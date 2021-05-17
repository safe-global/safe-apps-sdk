"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardWrapper = void 0;
const safe_apps_sdk_1 = __importDefault(require("@gnosis.pm/safe-apps-sdk"));
const safe_apps_provider_1 = require("@gnosis.pm/safe-apps-provider");
const bnc_onboard_1 = __importDefault(require("bnc-onboard"));
class OnboardWrapper {
    constructor(options) {
        this.sdk = new safe_apps_sdk_1.default();
        this.onboardApi = bnc_onboard_1.default(options);
        this.subscriptions = options.subscriptions;
        this.checkSafeApp().catch(console.log);
    }
    async connectedSafe(timeout) {
        if (!this.safe)
            this.safe = await Promise.race([
                this.sdk.getSafeInfo(),
                new Promise((resolve) => setTimeout(resolve, timeout || 100)),
            ]);
        return this.safe;
    }
    checkSafeApp() {
        return this.connectedSafe().then((safe) => {
            if (!safe)
                return;
            if (!this.state) {
                const provider = new safe_apps_provider_1.SafeAppProvider(safe, this.sdk);
                this.state = {
                    address: safe.safeAddress,
                    network: provider.chainId,
                    appNetworkId: provider.chainId,
                    balance: '0',
                    mobileDevice: false,
                    wallet: {
                        name: 'Gnosis Safe',
                        provider,
                        type: 'sdk',
                    },
                };
            }
            const subscriptions = this.subscriptions;
            if (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.wallet)
                subscriptions.wallet(this.state.wallet);
            if (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.address)
                subscriptions.address(safe.safeAddress);
            if (subscriptions === null || subscriptions === void 0 ? void 0 : subscriptions.network)
                subscriptions.network(this.state.wallet.provider.chainId);
        });
    }
    reset() {
        var _a;
        this.state = undefined;
        if ((_a = this.subscriptions) === null || _a === void 0 ? void 0 : _a.address)
            this.subscriptions.address('');
    }
    async walletSelect(autoSelectWallet) {
        if ((await this.connectedSafe()) !== undefined) {
            await this.checkSafeApp();
            return true;
        }
        return this.onboardApi.walletSelect(autoSelectWallet);
    }
    async walletCheck() {
        if ((await this.connectedSafe()) !== undefined) {
            return true;
        }
        return this.onboardApi.walletCheck();
    }
    walletReset() {
        this.reset();
        this.onboardApi.walletReset();
    }
    async accountSelect() {
        if ((await this.connectedSafe()) !== undefined)
            return false;
        return this.onboardApi.accountSelect();
    }
    config(options) {
        this.onboardApi.config(options);
    }
    getState() {
        if (this.state)
            return this.state;
        return this.onboardApi.getState();
    }
}
exports.OnboardWrapper = OnboardWrapper;
//# sourceMappingURL=wrapper.js.map