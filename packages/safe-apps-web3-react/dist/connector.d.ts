import { AbstractConnector } from '@web3-react/abstract-connector';
import { ConnectorUpdate } from '@web3-react/types';
import { Opts, SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { SafeAppProvider } from '@gnosis.pm/safe-apps-provider';
declare class SafeAppConnector extends AbstractConnector {
    private readonly sdk;
    private safe;
    private provider;
    constructor(opts?: Opts);
    activate(): Promise<ConnectorUpdate>;
    getSafeInfo(): Promise<SafeInfo>;
    getProvider(): Promise<SafeAppProvider>;
    getChainId(): Promise<number>;
    getAccount(): Promise<string>;
    deactivate(): void;
    isSafeApp(): Promise<boolean>;
}
export { SafeAppConnector };
