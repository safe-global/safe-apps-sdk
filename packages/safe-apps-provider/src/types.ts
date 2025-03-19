import { EventEmitter } from 'events';

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

export interface EIP1193Provider extends EventEmitter {
  connect(params?: any): Promise<void>;
  disconnect(): Promise<void>;
  request(args: RequestArguments): Promise<unknown>;
}

// EIP-5792 - https://eips.ethereum.org/EIPS/eip-5792

// wallet_sendCalls

type Capability = {
  [key: string]: unknown;
  optional?: boolean;
};

export type SendCallsParams = {
  version: string;
  id?: string;
  from?: `0x${string}`;
  chainId: `0x${string}`;
  calls: Array<{
    to?: `0x${string}`;
    data?: `0x${string}`;
    value?: `0x${string}`;
    capabilities?: Record<string, Capability>;
  }>;
  capabilities?: Record<string, Capability>;
};

export type SendCallsResult = {
  id: string;
  capabilities?: Record<string, unknown>;
};

// wallet_getCallsStatus

export type GetCallsParams = `0x${string}`;

export type GetCallsResult = {
  version: '1.0';
  id: `0x${string}`;
  chainId: `0x${string}`;
  status:
    | 100 // Batch has been received by the wallet but has not completed execution onchain (pending)
    | 200 // Batch has been included onchain without reverts, receipts array contains info of all calls (confirmed)
    | 400 // Batch has not been included onchain and wallet will not retry (offchain failure)
    | 500 // Batch reverted completely and only changes related to gas charge may have been included onchain (chain rules failure)
    | 600; // Batch reverted partially and some changes related to batch calls may have been included onchain (partial chain rules failure);
  receipts?: Array<{
    logs: Array<{
      address: `0x${string}`;
      data: `0x${string}`;
      topics: Array<`0x${string}`>;
    }>;
    status: `0x${string}`; // Hex 1 or 0 for success or failure, respectively
    blockHash: `0x${string}`;
    blockNumber: `0x${string}`;
    gasUsed: `0x${string}`;
    transactionHash: `0x${string}`;
  }>;
  capabilities?: Record<string, unknown>;
};
