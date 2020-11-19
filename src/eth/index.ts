import { TransactionConfig, PastLogsOptions } from 'web3-core';
import { RPC_CALLS } from '../eth/constants';
import {
  RpcCallNames,
  RequestArgs,
  Communicator,
  Log,
  BlockTransactionString,
  BlockTransactionObject,
  Web3TransactionObject,
  RPCPayload,
} from '../types';
import { METHODS } from '../communication/methods';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Formatter = (arg: any) => any;

const inputFormatters: Record<string, Formatter> = {
  defaultBlockParam: (arg = 'latest') => arg,
  fullTxObjectParam: (arg = false): boolean => arg,
  numberToHex: (arg: number): string => `0x${arg.toString(16)}`,
};

type BuildRequestArgs = {
  call: RpcCallNames;
  formatters?: (Formatter | null)[];
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
    this.call = this.buildRequest<[TransactionConfig, string?], string>({
      call: RPC_CALLS.eth_call,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getBalance = this.buildRequest<[string, string?], string>({
      call: RPC_CALLS.eth_getBalance,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getCode = this.buildRequest<[string, string?], string>({
      call: RPC_CALLS.eth_getCode,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getStorageAt = this.buildRequest<[string, number, string?], string>({
      call: RPC_CALLS.eth_getStorageAt,
      formatters: [null, inputFormatters.numberToHex, inputFormatters.defaultBlockParam],
    });
    this.getPastLogs = this.buildRequest<[PastLogsOptions], Log[]>({
      call: RPC_CALLS.eth_getLogs,
    });
    this.getBlockByHash = this.buildRequest<[string, boolean?], BlockTransactionString | BlockTransactionObject>({
      call: RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getBlockByNumber = this.buildRequest<[number, boolean?], BlockTransactionString | BlockTransactionObject>({
      call: RPC_CALLS.eth_getBlockByNumber,
      formatters: [inputFormatters.numberToHex, inputFormatters.fullTxObjectParam],
    });
    this.getTransactionByHash = this.buildRequest<[string], Web3TransactionObject>({
      call: RPC_CALLS.eth_getTransactionByHash,
    });
    this.getTransactionReceipt = this.buildRequest<[string], Web3TransactionObject>({
      call: RPC_CALLS.eth_getTransactionReceipt,
    });
  }

  private buildRequest<P extends unknown[], R = unknown>({ call, formatters }: BuildRequestArgs) {
    return async (args: RequestArgs<P>): Promise<R> => {
      const params = args.params;

      if (formatters && Array.isArray(params)) {
        formatters.forEach((formatter: ((...args: unknown[]) => unknown) | null, i) => {
          if (formatter) {
            params[i] = formatter((args.params as unknown[])[i]);
          }
        });
      }

      const payload: RPCPayload<P> = {
        call,
        params,
      };

      const response = await this.#communicator.send<'rpcCall', RPCPayload<P>, R>(METHODS.rpcCall, payload);

      if (!response.success) {
        throw new Error(response.error);
      }

      return response.data;
    };
  }
}

export { Eth };
