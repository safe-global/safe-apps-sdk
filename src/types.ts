import { METHODS } from './communication/methods';
import { RPC_CALLS } from './eth/constants';
import { TXs } from './txs';
import { Eth } from './eth';

/*
    The reason for duplicating types in both uppercase/lowercase is because in the safe-react
    type for networks contains uppercase strings and with previous type it resulted in a type error.
    The sdk converts network to lowercase, so passing an uppercase one is totally valid too.
*/
export type UppercaseNetworks =
  | 'MAINNET'
  | 'MORDEN'
  | 'ROPSTEN'
  | 'RINKEBY'
  | 'GOERLI'
  | 'KOVAN'
  | 'XDAI'
  | 'ENERGY_WEB_CHAIN'
  | 'VOLTA'
  | 'UNKNOWN';
export type LowercaseNetworks =
  | 'mainnet'
  | 'morden'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'xdai'
  | 'energy_web_chain'
  | 'volta'
  | 'unknown';
export type Networks = UppercaseNetworks | LowercaseNetworks;

export interface Transaction {
  to: string;
  value: string;
  data: string;
}

export type RequestId = string;

export interface SendTransactionParams {
  safeTxGas?: number;
}

export interface SendTransactionsArgs {
  txs: Transaction[];
  params?: SendTransactionParams;
}
export interface SdkInstance {
  txs: TXs;
  eth: Eth;
}

export interface SafeInfo {
  safeAddress: string;
  network: LowercaseNetworks;
  ethBalance: string;
}

export interface TxConfirmationEvent {
  requestId: RequestId;
  safeTxHash: string;
}

export interface TxRejectionEvent {
  requestId: RequestId;
}

export type Methods = keyof typeof METHODS;

export interface InterfaceMessageEvent extends MessageEvent {
  data: {
    requestId: RequestId;
    method: Methods;
    response: MethodToResponse[Methods];
  };
}

export interface MethodToResponse {
  [METHODS.getEnvInfo]: { txServiceUrl: string };
  [METHODS.sendTransactions]: Record<string, string>;
  [METHODS.rpcCall]: Record<string, string>;
  [METHODS.getSafeInfo]: SafeInfo;
}

export interface MethodToParams {
  [METHODS.getEnvInfo]: undefined;
  [METHODS.sendTransactions]: unknown;
  [METHODS.rpcCall]: unknown;
  [METHODS.getSafeInfo]: undefined;
}

export type RPCPayload<R extends RpcCallNames, P extends unknown> = {
  call: R;
  params: P;
};

// copy-pasting all the types below from safe-react makes me think we might want to export them to a package

export enum Operation {
  CALL,
  DELEGATE_CALL,
  CREATE,
}

// types comes from: https://github.com/gnosis/safe-client-gateway/blob/752e76b6d1d475791dbd7917b174bb41d2d9d8be/src/utils.rs
export enum TransferMethods {
  TRANSFER = 'transfer',
  TRANSFER_FROM = 'transferFrom',
  SAFE_TRANSFER_FROM = 'safeTransferFrom',
}

export enum SettingsChangeMethods {
  SETUP = 'setup',
  SET_FALLBACK_HANDLER = 'setFallbackHandler',
  ADD_OWNER_WITH_THRESHOLD = 'addOwnerWithThreshold',
  REMOVE_OWNER = 'removeOwner',
  REMOVE_OWNER_WITH_THRESHOLD = 'removeOwnerWithThreshold',
  SWAP_OWNER = 'swapOwner',
  CHANGE_THRESHOLD = 'changeThreshold',
  CHANGE_MASTER_COPY = 'changeMasterCopy',
  ENABLE_MODULE = 'enableModule',
  DISABLE_MODULE = 'disableModule',
  EXEC_TRANSACTION_FROM_MODULE = 'execTransactionFromModule',
  APPROVE_HASH = 'approveHash',
  EXEC_TRANSACTION = 'execTransaction',
}

// note: this extends SAFE_METHODS_NAMES in /logic/contracts/methodIds.ts, we need to figure out which one we are going to use
export type DataDecodedMethod = TransferMethods | SettingsChangeMethods | string;

export interface ValueDecoded {
  operation: Operation;
  to: string;
  value: number;
  data: string;
  dataDecoded: DataDecoded;
}

export interface SingleTransactionMethodParameter {
  name: string;
  type: string;
  value: string;
}

export interface MultiSendMethodParameter extends SingleTransactionMethodParameter {
  valueDecoded: ValueDecoded[];
}

export type Parameter = MultiSendMethodParameter | SingleTransactionMethodParameter;

export interface DataDecoded {
  method: DataDecodedMethod;
  parameters: Parameter[];
}

export type ConfirmationServiceModel = {
  confirmationType: string;
  owner: string;
  submissionDate: string;
  signature: string;
  signatureType: string;
  transactionHash: string;
};

export type TxServiceModel = {
  baseGas: number;
  blockNumber?: number | null;
  confirmations: ConfirmationServiceModel[];
  confirmationsRequired: number;
  creationTx?: boolean | null;
  data?: string | null;
  dataDecoded?: DataDecoded;
  ethGasPrice: string;
  executionDate?: string | null;
  executor: string;
  fee: string;
  gasPrice: string;
  gasToken: string;
  gasUsed: number;
  isExecuted: boolean;
  isSuccessful: boolean;
  modified: string;
  nonce?: number | null;
  operation: number;
  origin?: string | null;
  refundReceiver: string;
  safe: string;
  safeTxGas: number;
  safeTxHash: string;
  signatures: string;
  submissionDate?: string | null;
  to: string;
  transactionHash?: string | null;
  value: string;
};

export type RpcCallNames = keyof typeof RPC_CALLS;

export type RequestArgs<T> = {
  params: T;
  requestId?: RequestId;
};

export interface Communicator {
  send<M extends Methods, P = MethodToParams[M], R = MethodToResponse[M]>(messageId: M, data: P): Promise<R>;
}
