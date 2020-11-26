import { TransactionConfig, PastLogsOptions } from 'web3-core';
import { Communicator, Log, BlockTransactionString, BlockTransactionObject, Web3TransactionObject } from '../types';
declare class Eth {
    #private;
    call: (params: [TransactionConfig, (string | undefined)?]) => Promise<string>;
    getBalance: (params: [string, (string | undefined)?]) => Promise<string>;
    getCode: (params: [string, (string | undefined)?]) => Promise<string>;
    getStorageAt: (params: [string, number, (string | undefined)?]) => Promise<string>;
    getPastLogs: (params: [PastLogsOptions]) => Promise<Log[]>;
    getBlockByHash: (params: [string, (boolean | undefined)?]) => Promise<BlockTransactionString | BlockTransactionObject>;
    getBlockByNumber: (params: [number, (boolean | undefined)?]) => Promise<BlockTransactionString | BlockTransactionObject>;
    getTransactionByHash: (params: [string]) => Promise<Web3TransactionObject>;
    getTransactionReceipt: (params: [string]) => Promise<Web3TransactionObject>;
    constructor(communicator: Communicator);
    private buildRequest;
}
export { Eth };
