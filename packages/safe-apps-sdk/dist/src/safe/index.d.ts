import { Communicator, SafeInfo, SafeBalances, GetBalanceParams, BytesLike } from '../types';
declare class Safe {
    private readonly communicator;
    constructor(communicator: Communicator);
    getInfo(): Promise<SafeInfo>;
    experimental_getBalances({ currency }?: GetBalanceParams): Promise<SafeBalances>;
    static calculateMessageHash(message: BytesLike): string;
    private check1271Signature;
    private check1271SignatureBytes;
    isMessageSigned(message: BytesLike, signature?: string): Promise<boolean>;
    isMessageHashSigned(messageHash: string, signature?: string): Promise<boolean>;
}
export { Safe };
