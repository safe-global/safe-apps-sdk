export type TransferDirection = 'INCOMING' | 'OUTGOING';

export type Erc20Transfer = {
  type: 'ERC20';
  tokenAddress: string;
  tokenName: string | null;
  tokenSymbol: string | null;
  logoUri: string | null;
  decimals: number | null;
  value: string;
};

export type Erc721Transfer = {
  type: 'ERC721';
  tokenAddress: string;
  tokenId: string;
  tokenName: string | null;
  tokenSymbol: string | null;
  logoUri: string | null;
  decimals: number | null;
  value: string;
};

export type NativeTransfer = {
  type: 'ETHER';
  value: string;
  tokenSymbol: string | null;
  decimals: number | null;
};

export type TransferInfo = Erc20Transfer | Erc721Transfer | NativeTransfer;

export type Transfer = {
  type: 'Transfer';
  sender: string;
  recipient: string;
  direction?: TransferDirection;
  transferInfo: TransferInfo; // Polymorphic: Erc20, Erc721, Ether
};

export enum Operation {
  CALL,
  DELEGATE,
}

export type InternalTransaction = {
  operation: Operation;
  to: string;
  value: number | null;
  data: string | null;
  dataDecoded: DataDecoded | null;
};

export type Parameter = {
  name: string;
  type: string;
  value: string;
  valueDecoded: InternalTransaction[] | null;
};

export type DataDecoded = {
  method: string;
  parameters: Parameter[] | null;
};

export type SetFallbackHandler = {
  type: 'SET_FALLBACK_HANDLER';
  handler: string;
};

export type AddOwner = {
  type: 'ADD_OWNER';
  owner: string;
  threshold: number;
};

export type RemoveOwner = {
  type: 'REMOVE_OWNER';
  owner: string;
  threshold: number;
};

export type SwapOwner = {
  type: 'SWAP_OWNER';
  oldOwner: string;
  newOwner: string;
};

export type ChangeThreshold = {
  type: 'CHANGE_THRESHOLD';
  threshold: number;
};

export type ChangeImplementation = {
  type: 'CHANGE_IMPLEMENTATION';
  implementation: string;
};

export type EnableModule = {
  type: 'ENABLE_MODULE';
  module: string;
};

export type DisableModule = {
  type: 'DISABLE_MODULE';
  module: string;
};

export type SettingsInfo =
  | SetFallbackHandler
  | AddOwner
  | RemoveOwner
  | SwapOwner
  | ChangeThreshold
  | ChangeImplementation
  | EnableModule
  | DisableModule;

export type SettingsChange = {
  type: 'SettingsChange';
  dataDecoded: DataDecoded;
  settingsInfo: SettingsInfo | null;
};

export type AddressInfo = {
  name: string;
  logoUri: string | null;
};

export type BaseCustom = {
  type: 'Custom';
  to: string;
  dataSize: string;
  value: string;
  isCancellation: boolean;
  toInfo?: AddressInfo;
};

export type Custom = BaseCustom & {
  methodName: string | null;
};

export type MultiSend = BaseCustom & {
  methodName: 'multiSend';
  actionCount: number;
};

export type Creation = {
  type: 'Creation';
  creator: string;
  transactionHash: string;
  implementation: string | null;
  factory: string | null;
};

export type TransactionStatus =
  | 'AWAITING_CONFIRMATIONS'
  | 'AWAITING_EXECUTION'
  | 'CANCELLED'
  | 'FAILED'
  | 'SUCCESS'
  | 'PENDING'
  | 'PENDING_FAILED'
  | 'WILL_BE_REPLACED';

export type TransactionInfo = Transfer | SettingsChange | Custom | MultiSend | Creation;

export type SafeAppInfo = {
  name: string;
  url: string;
  logoUrl: string;
};

export type TransactionData = {
  hexData: string | null;
  dataDecoded: DataDecoded | null;
  to: string;
  value: string | null;
  operation: Operation;
};

export type ModuleExecutionDetails = {
  type: 'MODULE';
  address: string;
};

export type MultiSigConfirmations = {
  signer: string;
  signature: string | null;
};

export type TokenType = 'ERC721' | 'ERC20' | 'ETHER';

export type TokenInfo = {
  tokenType: TokenType;
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  logoUri: string | null;
};

export type MultiSigExecutionDetails = {
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

export type DetailedExecutionInfo = ModuleExecutionDetails | MultiSigExecutionDetails;

export type GatewayTransactionDetails = {
  executedAt: number | null;
  txStatus: TransactionStatus;
  txInfo: TransactionInfo;
  txData: TransactionData | null;
  detailedExecutionInfo: DetailedExecutionInfo | null;
  txHash: string | null;
  safeAppInfo: SafeAppInfo | null;
};

export type TokenBalance = {
  tokenInfo: TokenInfo;
  balance: string;
  fiatBalance: string;
  fiatConversion: string;
};

export type SafeBalances = {
  fiatTotal: string;
  items: TokenBalance[];
};
