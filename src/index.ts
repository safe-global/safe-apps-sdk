export type Networks = "rinkeby" | "mainnet";

// Information returned by safe-app when onSafeInfo listeners is called.
export interface SafeInfo {
  safeAddress: string;
  network: Networks;
  ethBalance: string;
}

export interface SafeListeners {
  onSafeInfo: (info: SafeInfo) => any;
}

enum FromSafeMessages {
  ON_SAFE_INFO = "ON_SAFE_INFO",
}

enum ToSafeMessages {
  SEND_TRANSACTIONS = "SEND_TRANSACTIONS",
}

const config: {
  safeAppUrl?: string;
  listeners?: SafeListeners;
} = {};

const _logMessageFromSafe = (origin: string, message: FromSafeMessages) => {
  console.info(
    `SafeConnector: A message with id ${message} was received from origin ${origin}.`
  );
};

const _onParentMessage = async ({ origin, data }: MessageEvent) => {
  if (origin === window.origin) {
    return;
  }

  if (origin !== config.safeAppUrl) {
    console.error(
      `SafeConnector: A message was received from an unknown origin: ${origin}.`
    );
    return;
  }

  if (!data || !data.messageId) {
    console.error(
      `SafeConnector: A message was received from origin ${origin} with NO message id provided.`
    );
    return;
  }

  if (!config.listeners) {
    console.error(
      `SafeConnector: A message was received from origin ${origin} but no listeners were registered.`
    );
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
        `SafeConnector: A message was received from origin ${origin} with an unknown message id: ${data.messageId}`
      );
      break;
    }
  }
};

const _sendMessageToParent = (messageId: string, data: any) => {
  if (!config.safeAppUrl) {
    throw Error(
      "Provide a safeAppUrl using the setSafeAppUrl method before continue."
    );
  }
  window.parent.postMessage({ messageId, data }, config.safeAppUrl);
};

/**
 * Sets Safe-app url that will render the third-party app.
 * @param parentUrl
 */
function setSafeAppUrl(url: string) {
  config.safeAppUrl = url;
}

/**
 * Register all the listeners supported. When Safe-app sends a message
 * depending on the messageId, the corresponding listener will be called
 * @param listeners
 */
function addListeners({ ...allListeners }: SafeListeners) {
  config.listeners = { ...allListeners };
  window.addEventListener("message", _onParentMessage);
}

/**
 * Unregister all the listeners previously set by addListeners.
 */
function removeListeners() {
  window.removeEventListener("message", _onParentMessage);
}

/**
 * Request Safe app to send transactions
 * @param txs
 */
function sendTransactions(txs: Array<any>) {
  _sendMessageToParent(ToSafeMessages.SEND_TRANSACTIONS, txs);
}

export default {
  setSafeAppUrl,
  addListeners,
  removeListeners,
  sendTransactions,
};
