import InterfaceCommunicator from './communication/index.js';
import { TXs } from './txs/index.js';
import { Eth } from './eth/index.js';
import { Safe } from './safe/index.js';
import { Wallet } from './wallet/index.js';
class SafeAppsSDK {
    constructor(opts = {}) {
        const { allowedDomains = null, debug = false } = opts;
        this.communicator = new InterfaceCommunicator(allowedDomains, debug);
        this.eth = new Eth(this.communicator);
        this.txs = new TXs(this.communicator);
        this.safe = new Safe(this.communicator);
        this.wallet = new Wallet(this.communicator);
    }
}
export default SafeAppsSDK;
//# sourceMappingURL=sdk.js.map