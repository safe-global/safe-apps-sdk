export type Networks = 'rinkeby' | 'mainnet';

export interface SdkInstance {
  addListeners: (listeners: SafeListeners) => void;
  removeListeners: () => void;
  sendTransactions: (txs: any[]) => void;
}

export interface SafeInfo {
  safeAddress: string;
  network: Networks;
  ethBalance: string;
}

export interface SafeListeners {
  onSafeInfo: (info: SafeInfo) => any;
}

export enum FromSafeMessages {
  ON_SAFE_INFO = 'ON_SAFE_INFO',
}

export enum ToSafeMessages {
  SEND_TRANSACTIONS = 'SEND_TRANSACTIONS',
}

const config: {
  safeAppUrls: string[];
  listeners?: SafeListeners;
} = {
  safeAppUrls: [
    'https://gnosis-safe.io/',
    'https://safe-team.staging.gnosisdev.com/',
    'https://rinkeby.gnosis-safe.io/',
    'https://safe-team-rinkeby.staging.gnosisdev.com/',
  ],
};

const _logMessageFromSafe = (origin: string, message: FromSafeMessages) => {
  console.info(`SafeConnector: A message with id ${message} was received from origin ${origin}.`);
};

const _onParentMessage = async ({ origin, data }: MessageEvent) => {
  if (origin === window.origin) {
    return;
  }

  if (!config.safeAppUrls.includes(origin)) {
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
    case FromSafeMessages.ON_SAFE_INFO: {
      _logMessageFromSafe(origin, FromSafeMessages.ON_SAFE_INFO);

      config.listeners.onSafeInfo({
        safeAddress: data.data.safeAddress,
        network: data.data.network.toLowerCase(),
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

const _sendMessageToParent = (messageId: string, data: any) => {
  window.parent.postMessage({ messageId, data }, '*');
};

/**
 * Register all the listeners supported. When Safe-app sends a message
 * depending on the messageId, the corresponding listener will be called
 * @param listeners
 */
function addListeners({ ...allListeners }: SafeListeners) {
  config.listeners = { ...allListeners };
  window.addEventListener('message', _onParentMessage);
}

/**
 * Unregister all the listeners previously set by addListeners.
 */
function removeListeners() {
  window.removeEventListener('message', _onParentMessage);
}

/**
 * Request Safe app to send transactions
 * @param txs
 */
function sendTransactions(txs: any[]) {
  if (!txs || !txs.length) {
    return;
  }
  _sendMessageToParent(ToSafeMessages.SEND_TRANSACTIONS, txs);
}

/**
 * Sets Safe-app url that will render the third-party app.
 * @param parentUrl
 */
function initSdk(safeAppUrls: string[] = []) {
  safeAppUrls.forEach((url) => {
    if (!/(?:^|[ \t])((https?:\/\/)?(?:localhost|[\w-]+(?:\.[\w-]+)+)(:\d+)?(\/\S*)?)/gm.test(url)) {
      throw Error('Please provide a valid urls.');
    }

    if (url.substr(-1) !== '/') {
      url = `${url}/`;
    }
  });

  config.safeAppUrls = [...config.safeAppUrls, ...safeAppUrls];

  return { addListeners, removeListeners, sendTransactions };
}

export default initSdk;
