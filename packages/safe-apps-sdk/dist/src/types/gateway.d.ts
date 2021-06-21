export declare type TransferDirection = 'INCOMING' | 'OUTGOING';
export declare type Erc20Transfer = {
    type: 'ERC20';
    tokenAddress: string;
    tokenName: string | null;
    tokenSymbol: string | null;
    logoUri: string | null;
    decimals: number | null;
    value: string;
};
export declare type Erc721Transfer = {
    type: 'ERC721';
    tokenAddress: string;
    tokenId: string;
    tokenName: string | null;
    tokenSymbol: string | null;
    logoUri: string | null;
    decimals: number | null;
    value: string;
};
export declare type NativeTransfer = {
    type: 'ETHER';
    value: string;
    tokenSymbol: string | null;
    decimals: number | null;
};
export declare type TransferInfo = Erc20Transfer | Erc721Transfer | NativeTransfer;
export declare type Transfer = {
    type: 'Transfer';
    sender: string;
    recipient: string;
    direction?: TransferDirection;
    transferInfo: TransferInfo;
};
export declare enum Operation {
    CALL = 0,
    DELEGATE = 1
}
export declare type InternalTransaction = {
    operation: Operation;
    to: string;
    value: number | null;
    data: string | null;
    dataDecoded: DataDecoded | null;
};
export declare type Parameter = {
    name: string;
    type: string;
    value: string;
    valueDecoded: InternalTransaction[] | null;
};
export declare type DataDecoded = {
    method: string;
    parameters: Parameter[] | null;
};
export declare type SetFallbackHandler = {
    type: 'SET_FALLBACK_HANDLER';
    handler: string;
};
export declare type AddOwner = {
    type: 'ADD_OWNER';
    owner: string;
    threshold: number;
};
export declare type RemoveOwner = {
    type: 'REMOVE_OWNER';
    owner: string;
    threshold: number;
};
export declare type SwapOwner = {
    type: 'SWAP_OWNER';
    oldOwner: string;
    newOwner: string;
};
export declare type ChangeThreshold = {
    type: 'CHANGE_THRESHOLD';
    threshold: number;
};
export declare type ChangeImplementation = {
    type: 'CHANGE_IMPLEMENTATION';
    implementation: string;
};
export declare type EnableModule = {
    type: 'ENABLE_MODULE';
    module: string;
};
export declare type DisableModule = {
    type: 'DISABLE_MODULE';
    module: string;
};
export declare type SettingsInfo = SetFallbackHandler | AddOwner | RemoveOwner | SwapOwner | ChangeThreshold | ChangeImplementation | EnableModule | DisableModule;
export declare type SettingsChange = {
    type: 'SettingsChange';
    dataDecoded: DataDecoded;
    settingsInfo: SettingsInfo | null;
};
export declare type AddressInfo = {
    name: string;
    logoUri: string | null;
};
export declare type BaseCustom = {
    type: 'Custom';
    to: string;
    dataSize: string;
    value: string;
    isCancellation: boolean;
    toInfo?: AddressInfo;
};
export declare type Custom = BaseCustom & {
    methodName: string | null;
};
export declare type MultiSend = BaseCustom & {
    methodName: 'multiSend';
    actionCount: number;
};
export declare type Creation = {
    type: 'Creation';
    creator: string;
    transactionHash: string;
    implementation: string | null;
    factory: string | null;
};
export declare type TransactionStatus = 'AWAITING_CONFIRMATIONS' | 'AWAITING_EXECUTION' | 'CANCELLED' | 'FAILED' | 'SUCCESS' | 'PENDING' | 'PENDING_FAILED' | 'WILL_BE_REPLACED';
export declare type TransactionInfo = Transfer | SettingsChange | Custom | MultiSend | Creation;
export declare type SafeAppInfo = {
    name: string;
    url: string;
    logoUrl: string;
};
export declare type TransactionData = {
    hexData: string | null;
    dataDecoded: DataDecoded | null;
    to: string;
    value: string | null;
    operation: Operation;
};
export declare type ModuleExecutionDetails = {
    type: 'MODULE';
    address: string;
};
export declare type MultiSigConfirmations = {
    signer: string;
    signature: string | null;
};
export declare type TokenType = 'ERC721' | 'ERC20' | 'ETHER';
export declare type TokenInfo = {
    tokenType: TokenType;
    address: string;
    decimals: number;
    symbol: string;
    name: string;
    logoUri: string | null;
};
export declare type MultiSigExecutionDetails = {
    type: 'MULTISIG';
    submittedAt: number;
    nonce: number;
    safeTxGas: number;
    baseGas: number;
    gasPrice: string;
    gasToken: string;
    refundReceiver: string;
    safeTxHash: string;
    executor: string | null;
    signers: string[];
    confirmationsRequired: number;
    confirmations: MultiSigConfirmations[];
    gasTokenInfo: TokenInfo | null;
};
export declare type DetailedExecutionInfo = ModuleExecutionDetails | MultiSigExecutionDetails;
export declare type GatewayTransactionDetails = {
    executedAt: number | null;
    txStatus: TransactionStatus;
    txInfo: TransactionInfo;
    txData: TransactionData | null;
    detailedExecutionInfo: DetailedExecutionInfo | null;
    txHash: string | null;
    safeAppInfo: SafeAppInfo | null;
};
export declare type TokenBalance = {
    tokenInfo: TokenInfo;
    balance: string;
    fiatBalance: string;
    fiatConversion: string;
};
export declare type SafeBalances = {
    fiatTotal: string;
    items: TokenBalance[];
};
