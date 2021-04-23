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
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  on(event: string, listener: any): void;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  once(event: string, listener: any): void;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  removeListener(event: string, listener: any): void;
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
  off(event: string, listener: any): void;
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
