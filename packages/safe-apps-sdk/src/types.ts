import { METHODS } from './communication/methods';
import { RPC_CALLS } from './eth/constants';
import { TXs } from './txs';
import { Eth } from './eth';

export type Networks =
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

export type SendTransactionsResponse = {
  safeTxHash: string;
};

export interface SdkInstance {
  txs: TXs;
  eth: Eth;
}

export interface SafeInfo {
  safeAddress: string;
  network: Networks;
}

export type Methods = keyof typeof METHODS;

export type SDKRequestData<M extends Methods = Methods, P = unknown> = {
  id: RequestId;
  params: P;
  env: {
    sdkVersion: string;
  };
  method: M;
};

export type SDKMessageEvent = MessageEvent<SDKRequestData>;

export type ErrorResponse = {
  id: RequestId;
  success: false;
  error: string;
  version?: string;
};

export type SuccessResponse<T = MethodToResponse[Methods]> = {
  id: RequestId;
  data: T;
  version?: string;
  success: true;
};

export type Response<T = MethodToResponse[Methods]> = ErrorResponse | SuccessResponse<T>;

export type InterfaceMessageEvent = MessageEvent<Response>;

export type EnvInfo = {
  txServiceUrl: string;
};

export interface MethodToResponse {
  [METHODS.getEnvInfo]: EnvInfo;
  [METHODS.sendTransactions]: Record<string, string>;
  [METHODS.rpcCall]: unknown;
  [METHODS.getSafeInfo]: SafeInfo;
}

export type RPCPayload<P = unknown[]> = {
  call: RpcCallNames;
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

export interface Communicator {
  send<M extends Methods, P = unknown, R = unknown>(method: M, params: P): Promise<Response<R>>;
}

export interface Log {
  address: string;
  data: string;
  topics: string[];
  logIndex: number;
  transactionIndex: number;
  transactionHash: string;
  blockHash: string;
  blockNumber: number;
}

export interface BlockHeader {
  number: number;
  hash: string;
  parentHash: string;
  nonce: string;
  sha3Uncles: string;
  logsBloom: string;
  transactionRoot: string;
  stateRoot: string;
  receiptRoot: string;
  miner: string;
  extraData: string;
  gasLimit: number;
  gasUsed: number;
  timestamp: number | string;
}

export interface BlockTransactionBase extends BlockHeader {
  size: number;
  difficulty: number;
  totalDifficulty: number;
  uncles: string[];
}

export interface BlockTransactionObject extends BlockTransactionBase {
  transactions: Transaction[];
}

export interface BlockTransactionString extends BlockTransactionBase {
  transactions: string[];
}

export interface Web3TransactionObject {
  hash: string;
  nonce: number;
  blockHash: string | null;
  blockNumber: number | null;
  transactionIndex: number | null;
  from: string;
  to: string | null;
  value: string;
  gasPrice: string;
  gas: number;
  input: string;
}
