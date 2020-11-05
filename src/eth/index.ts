import { TransactionConfig, PastLogsOptions } from 'web3-core';
import { RPC_CALLS } from '../eth/constants';
import { RpcCallNames, RequestArgs, Communicator } from './../types';
import { METHODS } from '../communication/methods';

const inputFormatters = {
  defaultBlockParam: (arg = 'latest') => arg,
  fullTxObjectParam: (arg = false) => arg,
};

class Eth {
  public call;
  public getBalance;
  public getCode;
  public getStorageAt;
  public getPastLogs;
  public getBlockByHash;
  public getBlockByNumber;
  public getTransactionByHash;
  public getTransactionReceipt;
  #communicator: Communicator;

  constructor(communicator: Communicator) {
    this.#communicator = communicator;
    this.call = this.buildRequest<[TransactionConfig, string?], typeof RPC_CALLS.eth_call>({
      call: RPC_CALLS.eth_call,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getBalance = this.buildRequest<[string, string?], typeof RPC_CALLS.eth_getBalance>({
      call: RPC_CALLS.eth_getBalance,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getCode = this.buildRequest<[string, string?], typeof RPC_CALLS.eth_getCode>({
      call: RPC_CALLS.eth_getCode,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getStorageAt = this.buildRequest<[string, string?], typeof RPC_CALLS.eth_getStorageAt>({
      call: RPC_CALLS.eth_getStorageAt,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getPastLogs = this.buildRequest<[PastLogsOptions], typeof RPC_CALLS.eth_getLogs>({
      call: RPC_CALLS.eth_getLogs,
    });
    this.getBlockByHash = this.buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByHash>({
      call: RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getBlockByNumber = this.buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByNumber>({
      call: RPC_CALLS.eth_getBlockByNumber,
      formatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getTransactionByHash = this.buildRequest<[string], typeof RPC_CALLS.eth_getTransactionByHash>({
      call: RPC_CALLS.eth_getTransactionByHash,
    });
    this.getTransactionReceipt = this.buildRequest<[string], typeof RPC_CALLS.eth_getTransactionReceipt>({
      call: RPC_CALLS.eth_getTransactionReceipt,
    });
  }

  private buildRequest<P extends unknown | unknown[], C extends RpcCallNames>({
    call,
    formatters,
  }: {
    call: C;
    /* eslint-disable-next-line */
    formatters?: (((arg: any) => any) | null)[];
  }) {
    return (args: RequestArgs<P>): Promise<{ requestId: string }> => {
      const params = args.params;

      if (formatters && Array.isArray(params)) {
        formatters.forEach((formatter: ((...args: unknown[]) => unknown) | null, i) => {
          if (formatter) {
            params[i] = formatter((args.params as unknown[])[i]);
          }
        });
      }

      const payload = {
        call,
        params,
      };

      const message = this.#communicator.send(METHODS.rpcCall, payload, args.requestId);

      return message;
    };
  }
}

export { Eth };
