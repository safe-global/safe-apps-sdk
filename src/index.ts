import {
  SafeListeners,
  ValueOf,
  InterfaceMessages,
  InterfaceMessageEvent,
  Networks,
  SDKMessageToPayload,
  SDKMessageIds,
  Transaction,
  SdkInstance,
  SentSDKMessage,
  RequestId,
} from './types';
import { INTERFACE_MESSAGES, SDK_MESSAGES } from './messageIds';

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

const _sendMessageToParent = <T extends SDKMessageIds>(
  messageId: T,
  data: SDKMessageToPayload[T],
  requestId?: RequestId,
): SentSDKMessage<T> => {
  if (!requestId) {
    requestId = Math.trunc(window?.performance.now() || Date.now());
  }
  const message = {
    messageId,
    requestId,
    data,
  };

  window.parent.postMessage(message, '*');

  return message;
};

function sendInitializationMessage(): void {
  _sendMessageToParent(SDK_MESSAGES.SAFE_APP_SDK_INITIALIZED, undefined);
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
function sendTransactions(txs: Transaction[], requestId?: RequestId): SentSDKMessage<'SEND_TRANSACTIONS'> {
  if (!txs || !txs.length) {
    throw new Error('sendTransactions: No transactions were passed');
  }

  const message = _sendMessageToParent(SDK_MESSAGES.SEND_TRANSACTIONS, txs, requestId);

  return message;
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

export * from './types';
