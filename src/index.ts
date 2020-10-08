import {
  SafeListeners,
  InterfaceMessageIds,
  InterfaceMessageEvent,
  LowercaseNetworks,
  SDKMessageToPayload,
  SDKMessageIds,
  Transaction,
  SdkInstance,
  SentSDKMessage,
  RequestId,
  InterfaceMessageToPayload,
  SendTransactionParams,
  SendTransactionWithParamsArgs,
} from './types';
import { INTERFACE_MESSAGES, SDK_MESSAGES } from './messageIds';
import { txs as txsMethods, setTxServiceUrl } from './txs';

const config: {
  safeAppUrlsRegExp?: RegExp[];
  listeners?: SafeListeners;
} = {};

export const SEND_TRANSACTIONS_DEPRECATION_MSG = `sendTransactions will be deprecated in the next major release. Please use sendTransactionsWithParams method instead.
  Check the docs at https://github.com/gnosis/safe-apps-sdk
`;

const _logMessageFromSafe = (origin: string, messageId: InterfaceMessageIds): void => {
  console.info(`SafeConnector: A message with id ${messageId} was received from origin ${origin}.`);
};

// TODO: Think of a better way to type this
const _handleMessageFromInterface = async <T extends InterfaceMessageIds>(
  messageId: T,
  payload: InterfaceMessageToPayload[T],
  requestId: RequestId,
): Promise<void> => {
  _logMessageFromSafe(origin, messageId);
  switch (messageId) {
    case INTERFACE_MESSAGES.ENV_INFO:
      const typedPayload = payload as InterfaceMessageToPayload[typeof INTERFACE_MESSAGES.ENV_INFO];
      _logMessageFromSafe(origin, messageId);

      setTxServiceUrl(typedPayload.txServiceUrl);
      break;

    case INTERFACE_MESSAGES.ON_SAFE_INFO: {
      /* tslint:disable-next-line:no-shadowed-variable */
      const typedPayload = payload as InterfaceMessageToPayload[typeof INTERFACE_MESSAGES.ON_SAFE_INFO];

      config.listeners?.onSafeInfo({
        safeAddress: typedPayload.safeAddress,
        network: typedPayload.network.toLowerCase() as LowercaseNetworks,
        ethBalance: typedPayload.ethBalance,
      });

      break;
    }

    case INTERFACE_MESSAGES.TRANSACTION_CONFIRMED: {
      /* tslint:disable-next-line:no-shadowed-variable */
      const typedPayload = payload as InterfaceMessageToPayload[typeof INTERFACE_MESSAGES.TRANSACTION_CONFIRMED];

      config.listeners?.onTransactionConfirmation?.({
        requestId,
        safeTxHash: typedPayload.safeTxHash,
      });

      break;
    }

    case INTERFACE_MESSAGES.TRANSACTION_REJECTED: {
      config.listeners?.onTransactionRejection?.({
        requestId,
      });
      break;
    }

    default: {
      console.warn(
        `SafeConnector: A message was received from origin ${origin} with an unknown message id: ${messageId}`,
      );
      break;
    }
  }
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

  const { messageId, requestId, data: messagePayload } = data;

  _handleMessageFromInterface(messageId, messagePayload, requestId);
};

const _sendMessageToParent = <T extends SDKMessageIds>(
  messageId: T,
  data: SDKMessageToPayload[T],
  requestId?: RequestId,
): SentSDKMessage<T> => {
  if (!requestId) {
    if (typeof window !== 'undefined') {
      requestId = Math.trunc(window?.performance.now());
    } else {
      requestId = Math.trunc(Date.now());
    }
  }
  const message = {
    messageId,
    requestId,
    data,
  };

  if (typeof window !== 'undefined') {
    window.parent.postMessage(message, '*');
  }

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
  console.warn(SEND_TRANSACTIONS_DEPRECATION_MSG);
  if (!txs || !txs.length) {
    throw new Error('sendTransactions: No transactions were passed');
  }

  const message = _sendMessageToParent(SDK_MESSAGES.SEND_TRANSACTIONS, txs, requestId);

  return message;
}

/**
 * Request Safe app to send transactions
 * @param txs
 */
function sendTransactionsWithParams({
  txs,
  params,
  requestId,
}: SendTransactionWithParamsArgs): SentSDKMessage<'SEND_TRANSACTIONS_V2'> {
  if (!txs || !txs.length) {
    throw new Error('sendTransactionsWithParams: No transactions were passed');
  }

  const messagePayload = {
    txs,
    params,
  };

  const message = _sendMessageToParent(SDK_MESSAGES.SEND_TRANSACTIONS_V2, messagePayload, requestId);

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

  return { addListeners, removeListeners, sendTransactions, sendTransactionsWithParams, txs: txsMethods };
}

export default initSdk;

export * from './types';
export * from './messageIds';
