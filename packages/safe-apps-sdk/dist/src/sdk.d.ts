import { TXs } from './txs';
import { Eth } from './eth';
import { Safe } from './safe';
export declare type Opts = {
    whitelistedDomains?: RegExp[];
    debug?: boolean;
};
declare class SafeAppsSDK {
    private readonly communicator;
    readonly eth: Eth;
    readonly txs: TXs;
    readonly safe: Safe;
    constructor(opts?: Opts);
}
export default SafeAppsSDK;
