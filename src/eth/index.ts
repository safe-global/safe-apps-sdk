import { TransactionConfig, PastLogsOptions } from 'web3-core';
import { RPC_CALLS } from '../eth/constants';
import { buildRequest } from './request';

const inputFormatters = {
  defaultBlockParam: (...args: unknown[]) => console.log(args),
};

const eth = {
  call: buildRequest<[TransactionConfig, string?], typeof RPC_CALLS.eth_call>({
    call: RPC_CALLS.eth_call,
    inputFormatters: [inputFormatters.defaultBlockParam],
  }),
  getBalance: buildRequest<[string, string?], typeof RPC_CALLS.eth_getBalance>({ call: RPC_CALLS.eth_getBalance }),
  getCode: buildRequest<[string, string?], typeof RPC_CALLS.eth_getCode>({ call: RPC_CALLS.eth_getCode }),
  getPastLogs: buildRequest<PastLogsOptions, typeof RPC_CALLS.eth_getLogs>({ call: RPC_CALLS.eth_getLogs }),
  getBlockByHash: buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByHash>({
    call: RPC_CALLS.eth_getBlockByHash,
  }),
  getBlockByNumber: buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByNumber>({
    call: RPC_CALLS.eth_getBlockByNumber,
  }),
  getStorageAt: buildRequest<[string, string?], typeof RPC_CALLS.eth_getStorageAt>({
    call: RPC_CALLS.eth_getStorageAt,
  }),
  getTransactionByHash: buildRequest<string, typeof RPC_CALLS.eth_getTransactionByHash>({
    call: RPC_CALLS.eth_getTransactionByHash,
  }),
  getTransactionReceipt: buildRequest<string, typeof RPC_CALLS.eth_getTransactionReceipt>({
    call: RPC_CALLS.eth_getTransactionReceipt,
  }),
};

export { eth };
