export type Networks = 'rinkeby' | 'mainnet';

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

interface CustomMessageEvent extends MessageEvent {
  data: {
    messageId: keyof FromSafeMessages;
    data: FromMessageToPayload[keyof FromSafeMessages];
  };
}

export const TO_SAFE_MESSAGES = {
  GET_SAFE_INFO: 'GET_SAFE_INFO' as const,
  SEND_TRANSACTIONS: 'SEND_TRANSACTIONS' as const,
};

export interface ToMessageToPayload {
  [TO_SAFE_MESSAGES.GET_SAFE_INFO]: undefined;
  [TO_SAFE_MESSAGES.SEND_TRANSACTIONS]: Transaction[];
}

export type ToSafeMessages = typeof TO_SAFE_MESSAGES;

const FROM_SAFE_MESSAGES = {
  ON_SAFE_INFO: 'ON_SAFE_INFO' as const,
};

export interface FromMessageToPayload {
  [FROM_SAFE_MESSAGES.ON_SAFE_INFO]: SafeInfo;
}

export type FromSafeMessages = typeof FROM_SAFE_MESSAGES;

const config: {
  safeAppUrlsRegExp?: RegExp[];
  listeners?: SafeListeners;
} = {};

const _logMessageFromSafe = (origin: string, messageId: ValueOf<FromSafeMessages>): void => {
  console.info(`SafeConnector: A message with id ${messageId} was received from origin ${origin}.`);
};

const _onParentMessage = async ({ origin, data }: CustomMessageEvent): Promise<void> => {
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
    case FROM_SAFE_MESSAGES.ON_SAFE_INFO: {
      _logMessageFromSafe(origin, FROM_SAFE_MESSAGES.ON_SAFE_INFO);
      console.log(data.data);

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

const _sendMessageToParent = <T extends keyof ToSafeMessages>(messageId: T, data?: ToMessageToPayload[T]): void => {
  window.parent.postMessage({ messageId, data }, '*');
};

/**
 * Request the Safe info from the Safe web interface
 */
function requestSafeInfo(): void {
  _sendMessageToParent(TO_SAFE_MESSAGES.GET_SAFE_INFO);
}

/**
 * Register all the listeners supported. When Safe-app sends a message
 * depending on the messageId, the corresponding listener will be called
 * @param listeners
 */
function addListeners({ ...allListeners }: SafeListeners): void {
  config.listeners = { ...allListeners };
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
  _sendMessageToParent(TO_SAFE_MESSAGES.SEND_TRANSACTIONS, txs);
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
  requestSafeInfo();

  return { addListeners, removeListeners, sendTransactions };
}

export default initSdk;
