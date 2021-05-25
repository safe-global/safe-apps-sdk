import SafeAppsSDK, { SafeInfo } from '@gnosis.pm/safe-apps-sdk';
import { EIP1193Provider } from './types';
export declare class SafeAppProvider implements EIP1193Provider {
    private readonly safe;
    private readonly sdk;
    private submittedTxs;
    private events;
    constructor(safe: SafeInfo, sdk: SafeAppsSDK);
    connect(): Promise<void>;
    disconnect(): Promise<void>;
    on(event: string, listener: any): void;
    once(event: string, listener: any): void;
    off(event: string, listener: any): void;
    removeListener(event: string, listener: any): void;
    get chainId(): number;
    request(request: {
        method: string;
        params?: any[];
    }): Promise<any>;
    send(request: any, callback: (error: any, response?: any) => void): void;
}
