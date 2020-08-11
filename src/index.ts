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

type ValueOf<T> = T[keyof T];

export interface Transaction {
  to: string;
  value: string;
  data: string;
}

export interface SdkInstance {
  addListeners: (listeners: SafeListeners) => void;
  removeListeners: () => void;
  sendTransactions: (txs: Transaction[]) => void;
}

export interface SafeInfo {
  safeAddress: string;
  network: Networks;
  ethBalance: string;
}

export interface SafeListeners {
  onSafeInfo: (info: SafeInfo) => void;
}

interface InterfaceMessageEvent extends MessageEvent {
  data: {
    messageId: keyof InterfaceMessages;
    data: InterfaceMessageToPayload[keyof InterfaceMessages];
  };
}

export const SDK_MESSAGES = {
  SAFE_APP_SDK_INITIALIZED: 'SAFE_APP_SDK_INITIALIZED',
  SEND_TRANSACTIONS: 'SEND_TRANSACTIONS',
} as const;

export interface SDKMessageToPayload {
  [SDK_MESSAGES.SAFE_APP_SDK_INITIALIZED]: undefined;
  [SDK_MESSAGES.SEND_TRANSACTIONS]: Transaction[];
}

export type SDKMessages = typeof SDK_MESSAGES;

export const INTERFACE_MESSAGES = {
  ON_SAFE_INFO: 'ON_SAFE_INFO',
} as const;

export interface InterfaceMessageToPayload {
  [INTERFACE_MESSAGES.ON_SAFE_INFO]: SafeInfo;
}

export type InterfaceMessages = typeof INTERFACE_MESSAGES;

const config: {
  safeAppUrlsRegExp?: RegExp[];
  listeners?: SafeListeners;
} = {};

const _logMessageFromSafe = (origin: string, messageId: ValueOf<InterfaceMessages>): void => {
  console.info(`SafeConnector: A message with id ${messageId} was received from origin ${origin}.`);
};

const _onParentMessage = async ({ origin, data }: InterfaceMessageEvent): Promise<void> => {
  if (origin === window.origin) {
    return;
  }

  if (config.safeAppUrlsRegExp?.find((regExp) => regExp.test(origin)) === undefined) {
    console.error(`SafeConnector: A message was received from an unknown origin: ${origin}.`);
    return;
  }

  if (!data || !data.messageId) {
    console.error(`SafeConnector: A message was received from origin ${origin} with NO message id provided.`);
    return;
  }

  if (!config.listeners) {
    console.error(`SafeConnector: A message was received from origin ${origin} but no listeners were registered.`);
    return;
  }

  switch (data.messageId) {
    case INTERFACE_MESSAGES.ON_SAFE_INFO: {
      _logMessageFromSafe(origin, INTERFACE_MESSAGES.ON_SAFE_INFO);

      config.listeners.onSafeInfo({
        safeAddress: data.data.safeAddress,
        network: data.data.network.toLowerCase() as Networks,
        ethBalance: data.data.ethBalance,
      });

      break;
    }

    default: {
      console.warn(
        `SafeConnector: A message was received from origin ${origin} with an unknown message id: ${data.messageId}`,
      );
      break;
    }
  }
};

const _sendMessageToParent = <T extends keyof SDKMessages>(messageId: T, data?: SDKMessageToPayload[T]): void => {
  window.parent.postMessage({ messageId, data }, '*');
};

function sendInitializationMessage(): void {
  _sendMessageToParent(SDK_MESSAGES.SAFE_APP_SDK_INITIALIZED);
}

/**
 * Register all the listeners supported. When Safe-app sends a message
 * depending on the messageId, the corresponding listener will be called
 * @param listeners
 */
function addListeners(listeners: SafeListeners): void {
  config.listeners = { ...listeners };
  window.addEventListener('message', _onParentMessage);
}

/**
 * Unregister all the listeners previously set by addListeners.
 */
function removeListeners(): void {
  window.removeEventListener('message', _onParentMessage);
}

/**
 * Request Safe app to send transactions
 * @param txs
 */
function sendTransactions(txs: Transaction[]): void {
  if (!txs || !txs.length) {
    return;
  }
  _sendMessageToParent(SDK_MESSAGES.SEND_TRANSACTIONS, txs);
}

/**
 * Sets Safe-app url that will render the third-party app.
 * @param parentUrl
 */
function initSdk(safeAppUrlsRegExp: RegExp[] = []): SdkInstance {
  config.safeAppUrlsRegExp = [
    /https:\/\/.*(gnosis-safe\.io|gnosisdev.com)/, // Safe Multisig
    /https?:\/\/localhost:\d+/, // Safe Multisig desktop app.
    ...safeAppUrlsRegExp,
  ];
  sendInitializationMessage();

  return { addListeners, removeListeners, sendTransactions };
}

export default initSdk;
