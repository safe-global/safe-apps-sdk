import { TransactionConfig, PastLogsOptions } from 'web3-core';
import { RPC_CALLS } from '../eth/constants';
import { buildRequest } from './request';

const eth = {
  call: buildRequest<TransactionConfig, typeof RPC_CALLS.eth_call>(RPC_CALLS.eth_call),
  getBalance: buildRequest<string, typeof RPC_CALLS.eth_getBalance>(RPC_CALLS.eth_getBalance),
  getCode: buildRequest<string, typeof RPC_CALLS.eth_getCode>(RPC_CALLS.eth_getCode),
  getPastLogs: buildRequest<PastLogsOptions, typeof RPC_CALLS.eth_getLogs>(RPC_CALLS.eth_getLogs),
  getBlockByHash: buildRequest<string, typeof RPC_CALLS.eth_getBlockByHash>(RPC_CALLS.eth_getBlockByHash),
  getBlockByNumber: buildRequest<number, typeof RPC_CALLS.eth_getBlockByNumber>(RPC_CALLS.eth_getBlockByNumber),
  getStorageAt: buildRequest<string, typeof RPC_CALLS.eth_getStorageAt>(RPC_CALLS.eth_getStorageAt),
  getTransactionByHash: buildRequest<string, typeof RPC_CALLS.eth_getTransactionByHash>(
    RPC_CALLS.eth_getTransactionByHash,
  ),
  getTransactionReceipt: buildRequest<string, typeof RPC_CALLS.eth_getTransactionReceipt>(
    RPC_CALLS.eth_getTransactionReceipt,
  ),
};

export { eth };
