import { Communicator, ChainInfo, SafeBalances, GetBalanceParams, EnvironmentInfo, AddressBookItem, EIP712TypedData, SafeInfoExtended } from '../types/index.js';
declare class Safe {
    private readonly communicator;
    constructor(communicator: Communicator);
    getChainInfo(): Promise<ChainInfo>;
    getInfo(): Promise<SafeInfoExtended>;
    experimental_getBalances({ currency }?: GetBalanceParams): Promise<SafeBalances>;
    private check1271Signature;
    private check1271SignatureBytes;
    calculateMessageHash(message: string): string;
    calculateTypedMessageHash(typedMessage: EIP712TypedData): string;
    getOffChainSignature(messageHash: string): Promise<string>;
    isMessageSigned(message: string | EIP712TypedData, signature?: string): Promise<boolean>;
    isMessageHashSigned(messageHash: string, signature?: string): Promise<boolean>;
    getEnvironmentInfo(): Promise<EnvironmentInfo>;
    requestAddressBook(): Promise<AddressBookItem[]>;
}
export { Safe };
//# sourceMappingURL=index.d.ts.map