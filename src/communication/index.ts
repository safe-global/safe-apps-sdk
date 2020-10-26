import {
  InterfaceMessageIds,
  InterfaceMessageEvent,
  LowercaseNetworks,
  SentSDKMessage,
  SDKMessageIds,
  SDKMessageToPayload,
  RequestId,
  InterfaceMessageToPayload,
} from '../types';
import { INTERFACE_MESSAGES } from './messageIds';
import { setTxServiceUrl } from '../txs';

const _logMessageFromSafe = (origin: string, messageId: InterfaceMessageIds): void => {
  console.info(`SafeConnector: A message with id ${messageId} was received from origin ${origin}.`);
};

// TODO: Think of a better way to type this
const _handleMessageFromInterface = <T extends InterfaceMessageIds>(
  messageId: T,
  payload: InterfaceMessageToPayload[T],
  requestId: RequestId,
): void => {
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

const _onParentMessage = ({ origin, data }: InterfaceMessageEvent): void => {
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

const sendMessageToInterface = <T extends SDKMessageIds, D = SDKMessageToPayload[T]>(
  messageId: T,
  data: D,
  requestId?: RequestId,
): SentSDKMessage<T, D> => {
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

export { sendMessageToInterface };
export * from './messageIds';
