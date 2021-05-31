type TransferDirection = 'INCOMING' | 'OUTGOING';

type Erc20Transfer = {
  type: 'ERC20';
  tokenAddress: string;
  tokenName: string | null;
  tokenSymbol: string | null;
  logoUri: string | null;
  decimals: number | null;
  value: string;
};

type Erc721Transfer = {
  type: 'ERC721';
  tokenAddress: string;
  tokenId: string;
  tokenName: string | null;
  tokenSymbol: string | null;
  logoUri: string | null;
  decimals: number | null;
  value: string;
};

type NativeTransfer = {
  type: 'ETHER';
  value: string;
  tokenSymbol: string | null;
  decimals: number | null;
};

type TransferInfo = Erc20Transfer | Erc721Transfer | NativeTransfer;

type Transfer = {
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

type InternalTransaction = {
  operation: Operation;
  to: string;
  value: number | null;
  data: string | null;
  dataDecoded: DataDecoded | null;
};

type Parameter = {
  name: string;
  type: string;
  value: string;
  valueDecoded: InternalTransaction[] | null;
};

type DataDecoded = {
  method: string;
  parameters: Parameter[] | null;
};

type SetFallbackHandler = {
  type: 'SET_FALLBACK_HANDLER';
  handler: string;
};

type AddOwner = {
  type: 'ADD_OWNER';
  owner: string;
  threshold: number;
};

type RemoveOwner = {
  type: 'REMOVE_OWNER';
  owner: string;
  threshold: number;
};

type SwapOwner = {
  type: 'SWAP_OWNER';
  oldOwner: string;
  newOwner: string;
};

type ChangeThreshold = {
  type: 'CHANGE_THRESHOLD';
  threshold: number;
};

type ChangeImplementation = {
  type: 'CHANGE_IMPLEMENTATION';
  implementation: string;
};

type EnableModule = {
  type: 'ENABLE_MODULE';
  module: string;
};

type DisableModule = {
  type: 'DISABLE_MODULE';
  module: string;
};

type SettingsInfo =
  | SetFallbackHandler
  | AddOwner
  | RemoveOwner
  | SwapOwner
  | ChangeThreshold
  | ChangeImplementation
  | EnableModule
  | DisableModule;

type SettingsChange = {
  type: 'SettingsChange';
  dataDecoded: DataDecoded;
  settingsInfo: SettingsInfo | null;
};

type AddressInfo = {
  name: string;
  logoUri: string | null;
};

type BaseCustom = {
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

type MultiSend = BaseCustom & {
  methodName: 'multiSend';
  actionCount: number;
};

type Creation = {
  type: 'Creation';
  creator: string;
  transactionHash: string;
  implementation: string | null;
  factory: string | null;
};

type TransactionStatus =
  | 'AWAITING_CONFIRMATIONS'
  | 'AWAITING_EXECUTION'
  | 'CANCELLED'
  | 'FAILED'
  | 'SUCCESS'
  | 'PENDING'
  | 'PENDING_FAILED'
  | 'WILL_BE_REPLACED';

type TransactionInfo = Transfer | SettingsChange | Custom | MultiSend | Creation;

type ExecutionInfo = {
  nonce: number;
  confirmationsRequired: number;
  confirmationsSubmitted: number;
  missingSigners?: string[];
};

type SafeAppInfo = {
  name: string;
  url: string;
  logoUrl: string;
};

type TransactionSummary = {
  id: string;
  timestamp: number;
  txStatus: TransactionStatus;
  txInfo: TransactionInfo; // Polymorphic: Transfer, SettingsChange, Custom, Creation
  executionInfo: ExecutionInfo | null;
  safeAppInfo: SafeAppInfo | null;
};

type TransactionData = {
  hexData: string | null;
  dataDecoded: DataDecoded | null;
  to: string;
  value: string | null;
  operation: Operation;
};

type ModuleExecutionDetails = {
  type: 'MODULE';
  address: string;
};

type MultiSigConfirmations = {
  signer: string;
  signature: string | null;
};

export type TokenType = 'ERC721' | 'ERC20' | 'ETHER';

type TokenInfo = {
  tokenType: TokenType;
  address: string;
  decimals: number | null;
  symbol: string;
  name: string;
  logoUri: string | null;
};

type MultiSigExecutionDetails = {
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

type DetailedExecutionInfo = ModuleExecutionDetails | MultiSigExecutionDetails;

type ExpandedTxDetails = {
  executedAt: number | null;
  txStatus: TransactionStatus;
  txInfo: TransactionInfo;
  txData: TransactionData | null;
  detailedExecutionInfo: DetailedExecutionInfo | null;
  txHash: string | null;
};

type Transaction = TransactionSummary & {
  txDetails?: ExpandedTxDetails;
};

type StoreStructure = {
  queued: {
    next: { [nonce: number]: Transaction[] }; // 1 Transaction element
    queued: { [nonce: number]: Transaction[] }; // n Transaction elements
  };
  history: { [timestamp: number]: Transaction[] }; // n Transaction elements
};

type TxQueuedLocation = 'queued.next' | 'queued.queued';

type TxHistoryLocation = 'history';

type TxLocation = TxHistoryLocation | TxQueuedLocation;

type Label = {
  type: 'LABEL';
  label: 'Next' | 'Queued';
};

type DateLabel = {
  type: 'DATE_LABEL';
  timestamp: number;
};

type ConflictHeader = {
  type: 'CONFLICT_HEADER';
  nonce: number;
};

type TransactionGatewayResult = {
  type: 'TRANSACTION';
  transaction: TransactionSummary;
  conflictType: 'HasNext' | 'End' | 'None';
};

type GatewayResponse = {
  next: string | null;
  previous: string | null;
};

type HistoryGatewayResult = DateLabel | TransactionGatewayResult;

type HistoryGatewayResponse = GatewayResponse & {
  results: HistoryGatewayResult[];
};

type QueuedGatewayResult = Label | ConflictHeader | TransactionGatewayResult;

type QueuedGatewayResponse = GatewayResponse & {
  results: QueuedGatewayResult[];
};

export type TransactionDetails = {
  count: number;
  transactions: Array<[nonce: string, transactions: Transaction[]]>;
};

/**
 * Helper functions
 */

export const isDateLabel = (value: HistoryGatewayResult): value is DateLabel => {
  return value.type === 'DATE_LABEL';
};

export const isLabel = (value: QueuedGatewayResult): value is Label => {
  return value.type === 'LABEL';
};

export const isConflictHeader = (value: QueuedGatewayResult): value is ConflictHeader => {
  return value.type === 'CONFLICT_HEADER';
};

export const isTransactionSummary = (
  value: HistoryGatewayResult | QueuedGatewayResult,
): value is TransactionGatewayResult => {
  return value.type === 'TRANSACTION';
};

export const isTransferTxInfo = (value: TransactionInfo): value is Transfer => {
  return value.type === 'Transfer';
};

export const isSettingsChangeTxInfo = (value: TransactionInfo): value is SettingsChange => {
  return value.type === 'SettingsChange';
};

export const isCustomTxInfo = (value: TransactionInfo): value is Custom => {
  return value.type === 'Custom';
};

export const isMultiSendTxInfo = (value: TransactionInfo): value is MultiSend => {
  return isCustomTxInfo(value) && value.methodName === 'multiSend';
};

export const isCreationTxInfo = (value: TransactionInfo): value is Creation => {
  return value.type === 'Creation';
};

export const isStatusSuccess = (value: Transaction['txStatus']): value is 'SUCCESS' => {
  return value === 'SUCCESS';
};

export const isStatusFailed = (value: Transaction['txStatus']): value is 'FAILED' => {
  return value === 'FAILED';
};

export const isStatusCancelled = (value: Transaction['txStatus']): value is 'CANCELLED' => {
  return value === 'CANCELLED';
};

export const isStatusPending = (value: Transaction['txStatus']): value is 'PENDING' => {
  return value === 'PENDING';
};

export const isStatusAwaitingConfirmation = (value: Transaction['txStatus']): value is 'AWAITING_CONFIRMATIONS' => {
  return value === 'AWAITING_CONFIRMATIONS';
};

export const isStatusWillBeReplaced = (value: Transaction['txStatus']): value is 'WILL_BE_REPLACED' => {
  return value === 'WILL_BE_REPLACED';
};

export const isMultiSigExecutionDetails = (
  value: ExpandedTxDetails['detailedExecutionInfo'],
): value is MultiSigExecutionDetails => {
  return value?.type === 'MULTISIG';
};

export const isModuleExecutionDetails = (
  value: ExpandedTxDetails['detailedExecutionInfo'],
): value is ModuleExecutionDetails => {
  return value?.type === 'MODULE';
};
