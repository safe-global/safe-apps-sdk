import { TransactionConfig, PastLogsOptions } from 'web3-core';
import { RPC_CALLS } from '../eth/constants';
import { buildRequest } from './request';

const inputFormatters = {
  defaultBlockParam: (arg = 'latest') => arg,
  fullTxObjectParam: (arg = false) => arg,
};

class EthMethods {
  constructor(communicator) {
    this.call = buildRequest<[TransactionConfig, string?], typeof RPC_CALLS.eth_call>({
      call: RPC_CALLS.eth_call,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getBalance = buildRequest<[string, string?], typeof RPC_CALLS.eth_getBalance>({
      call: RPC_CALLS.eth_getBalance,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getCode = buildRequest<[string, string?], typeof RPC_CALLS.eth_getCode>({
      call: RPC_CALLS.eth_getCode,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getStorageAt = buildRequest<[string, string?], typeof RPC_CALLS.eth_getStorageAt>({
      call: RPC_CALLS.eth_getStorageAt,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getPastLogs = buildRequest<[PastLogsOptions], typeof RPC_CALLS.eth_getLogs>({ call: RPC_CALLS.eth_getLogs });
    this.getBlockByHash = buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByHash>({
      call: RPC_CALLS.eth_getBlockByHash,
      inputFormatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getBlockByNumber = buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByNumber>({
      call: RPC_CALLS.eth_getBlockByNumber,
      inputFormatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getTransactionByHash = buildRequest<[string], typeof RPC_CALLS.eth_getTransactionByHash>({
      call: RPC_CALLS.eth_getTransactionByHash,
    });
    this.getTransactionReceipt = buildRequest<[string], typeof RPC_CALLS.eth_getTransactionReceipt>({
      call: RPC_CALLS.eth_getTransactionReceipt,
    });
  }
}

export { EthMethods };
