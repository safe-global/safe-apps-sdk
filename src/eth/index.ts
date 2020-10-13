import { buildRequest } from './method';

const eth = {
  call: buildRequest('eth_call'),
  getBalance: buildRequest('eth_getBalance'),
  getCode: buildRequest('eth_getCode'),
  getPastLogs: buildRequest('eth_getLogs'),
  getBlockByHash: buildRequest('eth_getBlockByHash'),
  getBlockByNumber: buildRequest('eth_getBlockByNumber'),
  getStorageAt: buildRequest('eth_getStorageAt'),
  getTransactionByHash: buildRequest('eth_getTransactionByHash'),
  getTransactionReceipt: buildRequest('eth_getTransactionReceipt'),
};

export { eth };
