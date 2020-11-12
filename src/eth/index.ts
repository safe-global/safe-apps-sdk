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
    this.call = this.buildRequest<[TransactionConfig, string?]>({
      call: RPC_CALLS.eth_call,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getBalance = this.buildRequest<[string, string?]>({
      call: RPC_CALLS.eth_getBalance,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getCode = this.buildRequest<[string, string?]>({
      call: RPC_CALLS.eth_getCode,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getStorageAt = this.buildRequest<[string, number, string?]>({
      call: RPC_CALLS.eth_getStorageAt,
      formatters: [null, null, inputFormatters.defaultBlockParam],
    });
    this.getPastLogs = this.buildRequest<[PastLogsOptions]>({
      call: RPC_CALLS.eth_getLogs,
    });
    this.getBlockByHash = this.buildRequest<[string, boolean?]>({
      call: RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getBlockByNumber = this.buildRequest<[string, boolean?]>({
      call: RPC_CALLS.eth_getBlockByNumber,
      formatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getTransactionByHash = this.buildRequest<[string]>({
      call: RPC_CALLS.eth_getTransactionByHash,
    });
    this.getTransactionReceipt = this.buildRequest<[string]>({
      call: RPC_CALLS.eth_getTransactionReceipt,
    });
  }

  private buildRequest<P extends unknown[]>({
    call,
    formatters,
  }: {
    call: RpcCallNames;
    /* eslint-disable-next-line */
    formatters?: (((arg: any) => any) | null)[];
  }) {
    return async (args: RequestArgs<P>): Promise<Record<string, string>> => {
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

      const response = await this.#communicator.send(METHODS.rpcCall, payload);

      return response;
    };
  }
}

export { Eth };
