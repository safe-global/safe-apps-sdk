import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
import Web3Modal, { ICoreOptions } from 'web3modal';
export declare class SafeAppWeb3Modal extends Web3Modal {
    private sdk;
    private safe?;
    private provider?;
    private triedToConnect;
    constructor(options?: Partial<ICoreOptions>, sdk?: SafeAppsSDK);
    private getConnectedSafe;
    getProvider(): Promise<SafeAppProvider>;
    requestProvider: () => Promise<any>;
    isSafeApp(): Promise<boolean>;
}
