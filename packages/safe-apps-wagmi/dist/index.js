"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _GnosisConnector_instances, _GnosisConnector_provider, _GnosisConnector_sdk, _GnosisConnector_safe, _GnosisConnector_getSafeInfo, _GnosisConnector_isSafeApp;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GnosisConnector = void 0;
const providers_1 = require("@ethersproject/providers");
const safe_apps_provider_1 = require("@gnosis.pm/safe-apps-provider");
const safe_apps_sdk_1 = __importDefault(require("@gnosis.pm/safe-apps-sdk"));
const utils_1 = require("ethers/lib/utils");
const wagmi_1 = require("wagmi");
function normalizeChainId(chainId) {
    if (typeof chainId === 'string') {
        const isHex = chainId.trim().substring(0, 2);
        return Number.parseInt(chainId, isHex === '0x' ? 16 : 10);
    }
    return chainId;
}
const __IS_IFRAME__ = (window === null || window === void 0 ? void 0 : window.parent) === window;
const __IS_SERVER__ = typeof window === 'undefined';
class GnosisConnector extends wagmi_1.Connector {
    constructor(config) {
        super(Object.assign(Object.assign({}, config), { options: config === null || config === void 0 ? void 0 : config.options }));
        _GnosisConnector_instances.add(this);
        this.id = 'safe';
        this.name = 'Safe';
        this.ready = !__IS_SERVER__ && __IS_IFRAME__;
        _GnosisConnector_provider.set(this, void 0);
        _GnosisConnector_sdk.set(this, void 0);
        _GnosisConnector_safe.set(this, void 0);
        __classPrivateFieldSet(this, _GnosisConnector_sdk, new safe_apps_sdk_1.default(config.options), "f");
    }
    async connect() {
        const runningAsSafeApp = await __classPrivateFieldGet(this, _GnosisConnector_instances, "m", _GnosisConnector_isSafeApp).call(this);
        if (!runningAsSafeApp) {
            throw new wagmi_1.ConnectorNotFoundError();
        }
        const provider = await this.getProvider();
        if (provider.on) {
            provider.on('accountsChanged', this.onAccountsChanged);
            provider.on('chainChanged', this.onChainChanged);
            provider.on('disconnect', this.onDisconnect);
        }
        const account = await this.getAccount();
        const id = await this.getChainId();
        return {
            account,
            provider,
            chain: { id, unsupported: await this.isChainUnsupported(id) },
        };
    }
    async disconnect() {
        const provider = await this.getProvider();
        if (!(provider === null || provider === void 0 ? void 0 : provider.removeListener))
            return;
        provider.removeListener('accountsChanged', this.onAccountsChanged);
        provider.removeListener('chainChanged', this.onChainChanged);
        provider.removeListener('disconnect', this.onDisconnect);
    }
    async getAccount() {
        if (!__classPrivateFieldGet(this, _GnosisConnector_safe, "f")) {
            throw new wagmi_1.ConnectorNotFoundError();
        }
        return (0, utils_1.getAddress)(__classPrivateFieldGet(this, _GnosisConnector_safe, "f").safeAddress);
    }
    async getChainId() {
        if (!__classPrivateFieldGet(this, _GnosisConnector_provider, "f")) {
            throw new wagmi_1.ConnectorNotFoundError();
        }
        return normalizeChainId(__classPrivateFieldGet(this, _GnosisConnector_provider, "f").chainId);
    }
    async getProvider() {
        if (!__classPrivateFieldGet(this, _GnosisConnector_provider, "f")) {
            const safe = await __classPrivateFieldGet(this, _GnosisConnector_instances, "m", _GnosisConnector_getSafeInfo).call(this);
            if (!safe) {
                throw new Error('Could not load Safe information');
            }
            __classPrivateFieldSet(this, _GnosisConnector_provider, new safe_apps_provider_1.SafeAppProvider(safe, __classPrivateFieldGet(this, _GnosisConnector_sdk, "f")), "f");
        }
        return __classPrivateFieldGet(this, _GnosisConnector_provider, "f");
    }
    async getSigner() {
        const provider = this.getProvider();
        const account = await this.getAccount();
        return new providers_1.Web3Provider(provider).getSigner(account);
    }
    async isAuthorized() {
        try {
            const account = await this.getAccount();
            return !!account;
        }
        catch (_a) {
            return false;
        }
    }
    onAccountsChanged(accounts) {
        if (accounts.length === 0)
            this.emit('disconnect');
        else
            this.emit('change', { account: (0, utils_1.getAddress)(accounts[0]) });
    }
    isChainUnsupported(chainId) {
        return !this.chains.some((x) => x.id === chainId);
    }
    onChainChanged(chainId) {
        const id = normalizeChainId(chainId);
        const unsupported = this.isChainUnsupported(id);
        this.emit('change', { chain: { id, unsupported } });
    }
    onDisconnect() {
        this.emit('disconnect');
    }
}
exports.GnosisConnector = GnosisConnector;
_GnosisConnector_provider = new WeakMap(), _GnosisConnector_sdk = new WeakMap(), _GnosisConnector_safe = new WeakMap(), _GnosisConnector_instances = new WeakSet(), _GnosisConnector_getSafeInfo = async function _GnosisConnector_getSafeInfo() {
    if (!__classPrivateFieldGet(this, _GnosisConnector_sdk, "f")) {
        throw new wagmi_1.ConnectorNotFoundError();
    }
    if (!__classPrivateFieldGet(this, _GnosisConnector_safe, "f")) {
        __classPrivateFieldSet(this, _GnosisConnector_safe, await __classPrivateFieldGet(this, _GnosisConnector_sdk, "f").safe.getInfo(), "f");
    }
    return __classPrivateFieldGet(this, _GnosisConnector_safe, "f");
}, _GnosisConnector_isSafeApp = async function _GnosisConnector_isSafeApp() {
    if (!this.ready) {
        return false;
    }
    const safe = await Promise.race([__classPrivateFieldGet(this, _GnosisConnector_instances, "m", _GnosisConnector_getSafeInfo).call(this), new Promise((resolve) => setTimeout(resolve, 300))]);
    return !!safe;
};
//# sourceMappingURL=index.js.map