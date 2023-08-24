import { TXs } from './txs/index.js';
import { Eth } from './eth/index.js';
import { Safe } from './safe/index.js';
import { Wallet } from './wallet/index.js';
export type Opts = {
    allowedDomains?: RegExp[];
    debug?: boolean;
};
declare class SafeAppsSDK {
    private readonly communicator;
    readonly eth: Eth;
    readonly txs: TXs;
    readonly safe: Safe;
    readonly wallet: Wallet;
    constructor(opts?: Opts);
}
export default SafeAppsSDK;
