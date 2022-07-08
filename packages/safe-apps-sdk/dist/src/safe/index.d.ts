import { Communicator, SafeInfo, ChainInfo, SafeBalances, GetBalanceParams, EnvironmentInfo } from '../types';
import { Wallet } from '../wallet';
declare class Safe {
    private readonly communicator;
    private readonly wallet;
    constructor(communicator: Communicator, wallet: Wallet);
    getChainInfo(): Promise<ChainInfo>;
    getInfo(): Promise<SafeInfo>;
    experimental_getBalances({ currency }?: GetBalanceParams): Promise<SafeBalances>;
    private check1271Signature;
    private check1271SignatureBytes;
    calculateMessageHash(message: string): string;
    isMessageSigned(message: string, signature?: string): Promise<boolean>;
    isMessageHashSigned(messageHash: string, signature?: string): Promise<boolean>;
    getEnvironmentInfo(): Promise<EnvironmentInfo>;
    getAddressBook(): Promise<any>;
}
export { Safe };
