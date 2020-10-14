import { buildRequest } from './request';
import { TransactionConfig, PastLogsOptions } from 'web3-core';

const eth = {
  call: buildRequest<TransactionConfig>('eth_call'),
  getBalance: buildRequest<string>('eth_getBalance'),
  getCode: buildRequest<string>('eth_getCode'),
  getPastLogs: buildRequest<PastLogsOptions>('eth_getLogs'),
  getBlockByHash: buildRequest<string>('eth_getBlockByHash'),
  getBlockByNumber: buildRequest<number>('eth_getBlockByNumber'),
  getStorageAt: buildRequest<string>('eth_getStorageAt'),
  getTransactionByHash: buildRequest<string>('eth_getTransactionByHash'),
  getTransactionReceipt: buildRequest<string>('eth_getTransactionReceipt'),
};

export { eth };
