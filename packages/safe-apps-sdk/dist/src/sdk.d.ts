import { SafeInfo } from './types';
import { TXs } from './txs';
import { Eth } from './eth';
declare type Opts = {
    whitelistedDomains?: RegExp[];
};
declare class SafeAppsSDK {
    #private;
    readonly eth: Eth;
    readonly txs: TXs;
    constructor(opts?: Opts);
    private bootstrap;
    private getEnvInfo;
    getSafeInfo(): Promise<SafeInfo>;
}
export default SafeAppsSDK;
