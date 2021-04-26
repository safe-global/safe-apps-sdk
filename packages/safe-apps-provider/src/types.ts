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

export type ProviderChainId = string;

export type ProviderAccounts = string[];

export interface SimpleEventEmitter {
  on(event: string, listener: (...args: any[]) => void): void;
  once(event: string, listener: (...args: any[]) => void): void;
  removeListener(event: string, listener: (...args: any[]) => void): void;
  off(event: string, listener: (...args: any[]) => void): void;
}

export interface EIP1193Provider extends SimpleEventEmitter {
  connect(params?: any): Promise<void>;
  disconnect(): Promise<void>;
  // connection event
  on(event: 'connect', listener: (info: ProviderInfo) => void): void;
  // disconnection event
  on(event: 'disconnect', listener: (error: ProviderRpcError) => void): void;
  // arbitrary messages
  on(event: 'message', listener: (message: ProviderMessage) => void): void;
  // chain changed event
  on(event: 'chainChanged', listener: (chainId: ProviderChainId) => void): void;
  // accounts changed event
  on(event: 'accountsChanged', listener: (accounts: ProviderAccounts) => void): void;
  // make an Ethereum RPC method call.
  request(args: RequestArguments): Promise<unknown>;
}
