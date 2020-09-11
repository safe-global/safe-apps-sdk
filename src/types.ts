import { INTERFACE_MESSAGES, SDK_MESSAGES } from './messageIds';
import { txs } from './txs';

/*
    The reason for duplicating types in both uppercase/lowercase is because in the safe-react
    type for networks contains uppercase strings and with previous type it resulted in a type error.
    The sdk converts network to lowercase, so passing an uppercase one is totally valid too.
*/
export type Networks =
  | 'MAINNET'
  | 'MORDEN'
  | 'ROPSTEN'
  | 'RINKEBY'
  | 'GOERLI'
  | 'KOVAN'
  | 'UNKNOWN'
  | 'mainnet'
  | 'morden'
  | 'ropsten'
  | 'rinkeby'
  | 'goerli'
  | 'kovan'
  | 'unknown';

export interface Transaction {
  to: string;
  value: string;
  data: string;
}

export type RequestId = number | string;

export interface SdkInstance {
  addListeners: (listeners: SafeListeners) => void;
  removeListeners: () => void;
  sendTransactions: (txs: Transaction[], requestId?: RequestId) => SentSDKMessage<'SEND_TRANSACTIONS'>;
  txs: typeof txs;
}

export interface SafeInfo {
  safeAddress: string;
  network: Networks;
  ethBalance: string;
}

export interface TxConfirmationEvent {
  requestId: RequestId;
  safeTxHash: string;
}

export interface SafeListeners {
  onSafeInfo: (info: SafeInfo) => void;
  onTransactionConfirmation: (event: TxConfirmationEvent) => void;
}

export type InterfaceMessageIds = keyof typeof INTERFACE_MESSAGES;

export interface InterfaceMessageEvent extends MessageEvent {
  data: {
    requestId: RequestId;
    messageId: InterfaceMessageIds;
    data: InterfaceMessageToPayload[InterfaceMessageIds];
  };
}

export interface SDKMessageToPayload {
  [SDK_MESSAGES.SAFE_APP_SDK_INITIALIZED]: undefined;
  [SDK_MESSAGES.SEND_TRANSACTIONS]: Transaction[];
}

export type SDKMessageIds = keyof typeof SDK_MESSAGES;

export interface InterfaceMessageToPayload {
  [INTERFACE_MESSAGES.ON_SAFE_INFO]: SafeInfo;
  [INTERFACE_MESSAGES.TRANSACTION_CONFIRMED]: {
    safeTxHash: string;
  };
  [INTERFACE_MESSAGES.ENV_INFO]: {
    txServiceUrl: string;
  };
}

export type SentSDKMessage<T extends SDKMessageIds> = {
  messageId: T;
  requestId: RequestId;
  data: SDKMessageToPayload[T];
};
