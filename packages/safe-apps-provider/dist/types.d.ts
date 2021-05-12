export interface ProviderRpcError extends Error {
    message: string;
    code: number;
    data?: unknown;
}
export interface ProviderMessage {
    type: string;
    data: unknown;
}
export interface ProviderInfo {
    chainId: string;
}
export interface RequestArguments {
    method: string;
    params?: unknown[] | Record<string, unknown>;
}
export declare type ProviderChainId = string;
export declare type ProviderAccounts = string[];
export interface SimpleEventEmitter {
    on(event: string, listener: (...args: any[]) => void): void;
    once(event: string, listener: (...args: any[]) => void): void;
    removeListener(event: string, listener: (...args: any[]) => void): void;
    off(event: string, listener: (...args: any[]) => void): void;
}
export interface EIP1193Provider extends SimpleEventEmitter {
    connect(params?: any): Promise<void>;
    disconnect(): Promise<void>;
    on(event: 'connect', listener: (info: ProviderInfo) => void): void;
    on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
    on(event: 'message', listener: (message: ProviderMessage) => void): void;
    on(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
    on(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
    request(args: RequestArguments): Promise<unknown>;
}
