import { Communicator, SafeInfo, ChainInfo, SafeBalances, GetBalanceParams, EnvironmentInfo, AddressBookItem, SignTypedMessageParams } from '../types';
declare class Safe {
    private readonly communicator;
    constructor(communicator: Communicator);
    getChainInfo(): Promise<ChainInfo>;
    getInfo(): Promise<SafeInfo>;
    experimental_getBalances({ currency }?: GetBalanceParams): Promise<SafeBalances>;
    private check1271Signature;
    private check1271SignatureBytes;
    calculateMessageHash(message: string): string;
    getTypedMessagePayload(message: string): Promise<SignTypedMessageParams>;
    calculateTypedMessageHash(typedMessage: SignTypedMessageParams): string;
    isMessageSigned(message: string, signature?: string): Promise<boolean>;
    isMessageHashSigned(messageHash: string, signature?: string): Promise<boolean>;
    getEnvironmentInfo(): Promise<EnvironmentInfo>;
    requestAddressBook(): Promise<AddressBookItem[]>;
}
export { Safe };
