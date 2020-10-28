import { TransactionConfig, PastLogsOptions } from 'web3-core';
import { RPC_CALLS } from '../eth/constants';
import { RpcCallNames, RequestArgs, RPCPayload, SentSDKMessage } from './../types';
import { SDK_MESSAGES } from './../communication/messageIds';

const inputFormatters = {
  defaultBlockParam: (arg = 'latest') => arg,
  fullTxObjectParam: (arg = false) => arg,
};

class EthMethods {
  public call;
  public getBalance;
  public getCode;
  public getStorageAt;
  public getPastLogs;
  public getBlockByHash;
  public getBlockByNumber;
  public getTransactionByHash;
  public getTransactionReceipt;
  private communicator;

  constructor(communicator) {
    this.communicator = communicator;
    this.call = this.buildRequest<[TransactionConfig, string?], typeof RPC_CALLS.eth_call>({
      call: RPC_CALLS.eth_call,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getBalance = this.buildRequest<[string, string?], typeof RPC_CALLS.eth_getBalance>({
      call: RPC_CALLS.eth_getBalance,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getCode = this.buildRequest<[string, string?], typeof RPC_CALLS.eth_getCode>({
      call: RPC_CALLS.eth_getCode,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getStorageAt = this.buildRequest<[string, string?], typeof RPC_CALLS.eth_getStorageAt>({
      call: RPC_CALLS.eth_getStorageAt,
      inputFormatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getPastLogs = this.buildRequest<[PastLogsOptions], typeof RPC_CALLS.eth_getLogs>({
      call: RPC_CALLS.eth_getLogs,
    });
    this.getBlockByHash = this.buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByHash>({
      call: RPC_CALLS.eth_getBlockByHash,
      inputFormatters: [null, inputFormatters.fullTxObjectParam],
    });
    this.getBlockByNumber = this.buildRequest<[string, boolean?], typeof RPC_CALLS.eth_getBlockByNumber>({
      call: RPC_CALLS.eth_getBlockByNumber,
      inputFormatters: [null, inputFormatters.fullTxObjectParam],
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
    inputFormatters,
  }: {
    call: C;
    /* eslint-disable-next-line */
    inputFormatters?: (((arg: any) => any) | null)[];
  }) {
    return (args: RequestArgs<P>): SentSDKMessage<'RPC_CALL', RPCPayload<C, P>> => {
      const params = args.params;

      if (inputFormatters && Array.isArray(params)) {
        inputFormatters.forEach((formatter: ((...args: unknown[]) => unknown) | null, i) => {
          if (formatter) {
            params[i] = formatter((args.params as unknown[])[i]);
          }
        });
      }

      const payload = {
        call,
        params,
      };

      const message = this.communicator.send(SDK_MESSAGES.RPC_CALL, payload, args.requestId);

      return message;
    };
  }
}

export { EthMethods };
