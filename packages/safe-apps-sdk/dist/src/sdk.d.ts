import { SafeInfo } from './types';
import { TXs } from './txs';
import { Eth } from './eth';
export declare type Opts = {
    whitelistedDomains?: RegExp[];
    debug?: boolean;
};
declare class SafeAppsSDK {
    private readonly communicator;
    readonly eth: Eth;
    readonly txs: TXs;
    constructor(opts?: Opts);
    private bootstrap;
    private getEnvInfo;
    getSafeInfo(): Promise<SafeInfo>;
}
export default SafeAppsSDK;
