"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSafeAppConnection = void 0;
const react_1 = __importDefault(require("react"));
const core_1 = require("@web3-react/core");
function useSafeAppConnection(connector) {
    const { activate, active } = core_1.useWeb3React();
    const [tried, setTried] = react_1.default.useState(false);
    react_1.default.useEffect(() => {
        connector.isSafeApp().then((loadedInSafe) => {
            if (loadedInSafe) {
                // On success active flag will change and in that case we'll set tried to true, check the hook below
                activate(connector, undefined, true).catch(() => {
                    setTried(true);
                });
            }
            else {
                setTried(true);
            }
        });
    }, [activate]); // intentionally only running on mount (make sure it's only mounted once :))
    // if the connection worked, wait until we get confirmation of that to flip the flag
    react_1.default.useEffect(() => {
        if (active) {
            setTried(true);
        }
    }, [active]);
    return tried;
}
exports.useSafeAppConnection = useSafeAppConnection;
//# sourceMappingURL=useSafeAppConnection.js.map