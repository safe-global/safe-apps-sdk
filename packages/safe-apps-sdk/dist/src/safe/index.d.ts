import { Communicator, SafeInfo, SafeBalances, GetBalanceParams } from '../types';
declare class Safe {
    private readonly communicator;
    constructor(communicator: Communicator);
    getInfo(): Promise<SafeInfo>;
    experimental_getBalances({ currency }?: GetBalanceParams): Promise<SafeBalances>;
    calculateSafeMessageHash(messageBytes: string): Promise<string>;
    private check1271Signature;
    private check1271SignatureBytes;
    isMessageSigned(messageHash: string, signature?: string): Promise<boolean>;
}
export { Safe };
