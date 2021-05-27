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
        this.triedToConnect = false;
        this.onboardApi = bnc_onboard_1.default(options);
        this.subscriptions = options.subscriptions;
    }
    async connectToSafe(timeout = 200) {
        if (!this.safe && !this.triedToConnect) {
            this.safe = await Promise.race([
                this.sdk.safe.getInfo(),
                new Promise((resolve) => setTimeout(resolve, timeout)),
            ]);
            this.triedToConnect = true;
        }
        return this.safe;
    }
    async isSafeApp() {
        const safe = await this.connectToSafe();
        return !!safe;
    }
    setOnboardState(safe) {
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
    }
    reset() {
        var _a;
        this.state = undefined;
        if ((_a = this.subscriptions) === null || _a === void 0 ? void 0 : _a.address)
            this.subscriptions.address('');
    }
    async walletSelect(autoSelectWallet) {
        const safe = await this.connectToSafe();
        if (safe) {
            await this.setOnboardState(safe);
            return true;
        }
        return this.onboardApi.walletSelect(autoSelectWallet);
    }
    async walletCheck() {
        const runningAsSafeApp = await this.isSafeApp();
        if (runningAsSafeApp) {
            return true;
        }
        return this.onboardApi.walletCheck();
    }
    walletReset() {
        this.reset();
        this.onboardApi.walletReset();
    }
    async accountSelect() {
        const runningAsSafeApp = await this.isSafeApp();
        if (runningAsSafeApp) {
            return false;
        }
        return this.onboardApi.accountSelect();
    }
    config(options) {
        this.onboardApi.config(options);
    }
    getState() {
        if (this.state) {
            return this.state;
        }
        return this.onboardApi.getState();
    }
}
exports.OnboardWrapper = OnboardWrapper;
//# sourceMappingURL=wrapper.js.map