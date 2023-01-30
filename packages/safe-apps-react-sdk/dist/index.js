"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSafeAppsSDK = exports.SafeProvider = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const safe_apps_sdk_1 = __importDefault(require("@safe-global/safe-apps-sdk"));
const SafeContext = (0, react_1.createContext)(undefined);
const SafeProvider = ({ loader = null, opts, children }) => {
    const [sdk] = (0, react_1.useState)(() => new safe_apps_sdk_1.default(opts));
    const [connected, setConnected] = (0, react_1.useState)(false);
    const [safe, setSafe] = (0, react_1.useState)({
        safeAddress: '',
        chainId: 1,
        threshold: 1,
        owners: [],
        isReadOnly: true,
    });
    const contextValue = (0, react_1.useMemo)(() => ({ sdk, connected, safe }), [sdk, connected, safe]);
    (0, react_1.useEffect)(() => {
        let active = true;
        const fetchSafeInfo = async () => {
            try {
                const safeInfo = await sdk.safe.getInfo();
                if (!active) {
                    return;
                }
                setSafe(safeInfo);
                setConnected(true);
            }
            catch (err) {
                if (!active) {
                    return;
                }
                setConnected(false);
            }
        };
        fetchSafeInfo();
        return () => {
            active = false;
        };
    }, [sdk]);
    if (!connected && loader) {
        return loader;
    }
    return (0, jsx_runtime_1.jsx)(SafeContext.Provider, Object.assign({ value: contextValue }, { children: children }));
};
exports.SafeProvider = SafeProvider;
const useSafeAppsSDK = () => {
    const value = (0, react_1.useContext)(SafeContext);
    if (value === undefined) {
        throw new Error('You probably forgot to put <SafeProvider>.');
    }
    return value;
};
exports.useSafeAppsSDK = useSafeAppsSDK;
exports.default = exports.SafeProvider;
//# sourceMappingURL=index.js.map