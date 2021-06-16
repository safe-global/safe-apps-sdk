import { BlockNumberArg, Communicator, Log, BlockTransactionString, BlockTransactionObject, Web3TransactionObject, TransactionConfig, Web3TransactionReceiptObject, PastLogsOptions } from '../types';
declare class Eth {
    call: (params: [TransactionConfig, (string | undefined)?]) => Promise<string>;
    getBalance: (params: [string, (string | undefined)?]) => Promise<string>;
    getCode: (params: [string, (string | undefined)?]) => Promise<string>;
    getStorageAt: (params: [string, number, (string | undefined)?]) => Promise<string>;
    getPastLogs: (params: [PastLogsOptions]) => Promise<Log[]>;
    getBlockByHash: (params: [string, (boolean | undefined)?]) => Promise<BlockTransactionObject | BlockTransactionString>;
    getBlockByNumber: (params: [BlockNumberArg, (boolean | undefined)?]) => Promise<BlockTransactionObject | BlockTransactionString>;
    getTransactionByHash: (params: [string]) => Promise<Web3TransactionObject>;
    getTransactionReceipt: (params: [string]) => Promise<Web3TransactionReceiptObject>;
    private readonly communicator;
    constructor(communicator: Communicator);
    private buildRequest;
}
export { Eth };
