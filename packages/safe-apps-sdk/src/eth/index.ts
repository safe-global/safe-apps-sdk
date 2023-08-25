import { RPC_CALLS } from '../eth/constants.js';
import {
  BlockNumberArg,
  RpcCallNames,
  Communicator,
  Log,
  BlockTransactionString,
  BlockTransactionObject,
  Web3TransactionObject,
  RPCPayload,
  TransactionConfig,
  Web3TransactionReceiptObject,
  PastLogsOptions,
  SafeSettings,
} from '../types/index.js';
import { Methods } from '../communication/methods.js';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Formatter = (arg: any) => any;

const inputFormatters: Record<string, Formatter> = {
  defaultBlockParam: (arg = 'latest') => arg,
  returnFullTxObjectParam: (arg = false): boolean => arg,
  blockNumberToHex: (arg: BlockNumberArg): string =>
    Number.isInteger(arg) ? `0x${arg.toString(16)}` : (arg as string),
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
  public getTransactionCount;
  public getGasPrice;
  public getEstimateGas;
  public setSafeSettings;

  private readonly communicator: Communicator;

  constructor(communicator: Communicator) {
    this.communicator = communicator;
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
      formatters: [null, inputFormatters.blockNumberToHex, inputFormatters.defaultBlockParam],
    });
    this.getPastLogs = this.buildRequest<[PastLogsOptions], Log[]>({
      call: RPC_CALLS.eth_getLogs,
    });
    this.getBlockByHash = this.buildRequest<[string, boolean?], BlockTransactionString | BlockTransactionObject>({
      call: RPC_CALLS.eth_getBlockByHash,
      formatters: [null, inputFormatters.returnFullTxObjectParam],
    });
    this.getBlockByNumber = this.buildRequest<
      [BlockNumberArg, boolean?],
      BlockTransactionString | BlockTransactionObject
    >({
      call: RPC_CALLS.eth_getBlockByNumber,
      formatters: [inputFormatters.blockNumberToHex, inputFormatters.returnFullTxObjectParam],
    });
    this.getTransactionByHash = this.buildRequest<[string], Web3TransactionObject>({
      call: RPC_CALLS.eth_getTransactionByHash,
    });
    this.getTransactionReceipt = this.buildRequest<[string], Web3TransactionReceiptObject>({
      call: RPC_CALLS.eth_getTransactionReceipt,
    });
    this.getTransactionCount = this.buildRequest<[string, string?], string>({
      call: RPC_CALLS.eth_getTransactionCount,
      formatters: [null, inputFormatters.defaultBlockParam],
    });
    this.getGasPrice = this.buildRequest<never[], string>({
      call: RPC_CALLS.eth_gasPrice,
    });
    this.getEstimateGas = (transaction: TransactionConfig): Promise<number> =>
      this.buildRequest<[TransactionConfig], number>({
        call: RPC_CALLS.eth_estimateGas,
      })([transaction]);
    this.setSafeSettings = this.buildRequest<[SafeSettings], SafeSettings>({
      call: RPC_CALLS.safe_setSettings,
    });
  }

  private buildRequest<P = never[], R = unknown>(args: BuildRequestArgs) {
    const { call, formatters } = args;

    return async (params?: P): Promise<R> => {
      if (formatters && Array.isArray(params)) {
        formatters.forEach((formatter: ((...args: unknown[]) => unknown) | null, i) => {
          if (formatter) {
            params[i] = formatter(params[i]);
          }
        });
      }

      const payload: RPCPayload<P> = {
        call,
        params: params || [],
      };

      const response = await this.communicator.send<Methods.rpcCall, RPCPayload<P>, R>(Methods.rpcCall, payload);

      return response.data;
    };
  }
}

export { Eth };
