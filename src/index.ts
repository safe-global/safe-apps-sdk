import {
  SafeListeners,
  Transaction,
  SdkInstance,
  SentSDKMessage,
  RequestId,
  SendTransactionWithParamsArgs,
  InterfaceMessageToPayload,
} from './types';
import { sendMessageToInterface, SDK_MESSAGES } from './communication';
import { txs as txsMethods } from './txs';
import { eth as ethMethods } from './eth';

const config: {
  safeAppUrlsRegExp?: RegExp[];
  listeners?: SafeListeners;
} = {};

export const SEND_TRANSACTIONS_DEPRECATION_MSG = `sendTransactions will be deprecated in the next major release. Please use sendTransactionsWithParams method instead.
  Check the docs at https://github.com/gnosis/safe-apps-sdk
`;

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

  const message = sendMessageToInterface(SDK_MESSAGES.SEND_TRANSACTIONS, txs, requestId);

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

  const message = sendMessageToInterface(SDK_MESSAGES.SEND_TRANSACTIONS_V2, messagePayload, requestId);

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

  if (typeof window === 'undefined') {
    throw new Error('Error initializing the sdk: window is undefined');
  }

  return {
    addListeners,
    removeListeners,
    sendTransactions,
    sendTransactionsWithParams,
    txs: txsMethods,
    eth: ethMethods,
  };
}

export default initSdk;

export * from './types';
export * from './communication/messageIds';
