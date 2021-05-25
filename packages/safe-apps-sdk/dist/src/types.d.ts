import { METHODS } from './communication/methods';
import { RPC_CALLS } from './eth/constants';
import { TXs } from './txs';
import { Eth } from './eth';
export interface Transaction {
    to: string;
    value: string;
    data: string;
}
export declare type RequestId = string;
export interface SendTransactionParams {
    safeTxGas?: number;
}
export interface SendTransactionsArgs {
    txs: Transaction[];
    params?: SendTransactionParams;
}
export declare type SendTransactionsResponse = {
    safeTxHash: string;
};
export interface SdkInstance {
    txs: TXs;
    eth: Eth;
}
export interface SafeInfo {
    safeAddress: string;
    chainId: number;
}
export declare type Methods = keyof typeof METHODS;
export declare type SDKRequestData<M extends Methods = Methods, P = unknown> = {
    id: RequestId;
    params: P;
    env: {
        sdkVersion: string;
    };
    method: M;
};
export declare type SDKMessageEvent = MessageEvent<SDKRequestData>;
export declare type ErrorResponse = {
    id: RequestId;
    success: false;
    error: string;
    version?: string;
};
export declare type SuccessResponse<T = MethodToResponse[Methods]> = {
    id: RequestId;
    data: T;
    version?: string;
    success: true;
};
export declare type Response<T = MethodToResponse[Methods]> = ErrorResponse | SuccessResponse<T>;
export declare type InterfaceMessageEvent = MessageEvent<Response>;
export declare type EnvInfo = {
    txServiceUrl: string;
};
export interface MethodToResponse {
    [METHODS.getEnvInfo]: EnvInfo;
    [METHODS.sendTransactions]: Record<string, string>;
    [METHODS.rpcCall]: unknown;
    [METHODS.getSafeInfo]: SafeInfo;
}
export declare type RPCPayload<P = unknown[]> = {
    call: RpcCallNames;
    params: P;
};
export declare enum Operation {
    CALL = 0,
    DELEGATE_CALL = 1,
    CREATE = 2
}
export declare enum TransferMethods {
    TRANSFER = "transfer",
    TRANSFER_FROM = "transferFrom",
    SAFE_TRANSFER_FROM = "safeTransferFrom"
}
export declare enum SettingsChangeMethods {
    SETUP = "setup",
    SET_FALLBACK_HANDLER = "setFallbackHandler",
    ADD_OWNER_WITH_THRESHOLD = "addOwnerWithThreshold",
    REMOVE_OWNER = "removeOwner",
    REMOVE_OWNER_WITH_THRESHOLD = "removeOwnerWithThreshold",
    SWAP_OWNER = "swapOwner",
    CHANGE_THRESHOLD = "changeThreshold",
    CHANGE_MASTER_COPY = "changeMasterCopy",
    ENABLE_MODULE = "enableModule",
    DISABLE_MODULE = "disableModule",
    EXEC_TRANSACTION_FROM_MODULE = "execTransactionFromModule",
    APPROVE_HASH = "approveHash",
    EXEC_TRANSACTION = "execTransaction"
}
export declare type DataDecodedMethod = TransferMethods | SettingsChangeMethods | string;
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
export declare type Parameter = MultiSendMethodParameter | SingleTransactionMethodParameter;
export interface DataDecoded {
    method: DataDecodedMethod;
    parameters: Parameter[];
}
export declare type ConfirmationServiceModel = {
    confirmationType: string;
    owner: string;
    submissionDate: string;
    signature: string;
    signatureType: string;
    transactionHash: string;
};
export declare type TxServiceModel = {
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
export declare type RpcCallNames = keyof typeof RPC_CALLS;
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
export interface Web3TransactionReceiptObject {
    transactionHash: string;
    transactionIndex: number;
    blockHash: string;
    blockNumber: number;
    from: string;
    to: string | null;
    cumulativeGasUsed: number;
    gasUsed: number;
    contractAddress: string;
    logs: Log[];
    logsBloom: string;
    status: number | undefined;
}
export declare type BlockNumberArg = number | 'earliest' | 'latest' | 'pending';
export interface TransactionConfig {
    from?: string | number;
    to?: string;
    value?: number | string;
    gas?: number | string;
    gasPrice?: number | string;
    data?: string;
    nonce?: number;
}
export interface PastLogsOptions {
    fromBlock?: BlockNumberArg;
    toBlock?: BlockNumberArg;
    address?: string;
    topics?: Array<string | string[] | null>;
}
