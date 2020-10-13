import { buildRequest } from './method';

const eth = {
  call: buildRequest('call'),
  getBalance: buildRequest('getBalance'),
  getBlockNumber: buildRequest('getBlockNumber'),
  getCode: buildRequest('getCode'),
  getPastLogs: buildRequest('getPastLogs'),
  getStorageAt: buildRequest('getStorageAt'),
  getTransactionByHash: buildRequest('getTransactionByHash'),
  getTransactionReceipt: buildRequest('getTransactionReceipt'),
};

export { eth };
