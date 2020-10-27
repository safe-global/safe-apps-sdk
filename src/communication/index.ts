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

class InterfaceCommunicator {
  private allowedOrigins: RegExp[] = [];

  constructor(allowedOrigins: RegExp[]) {
    this.allowedOrigins = allowedOrigins;
  }

  isValidMessage({ origin, data }: InterfaceMessageEvent): boolean {
    const emptyOrMalformed = !data || !data.messageId;
    const unknownOrigin = this.allowedOrigins?.find((regExp) => regExp.test(origin)) === undefined;
    const sameOrigin = origin === window.origin;

    return !emptyOrMalformed && !unknownOrigin && !sameOrigin;
  }

  logMessage(origin: string, payload: InterfaceMessageToPayload[InterfaceMessageIds]): void {
    console.info(`SafeConnector: A message was received from origin ${origin}. `, payload);
  }

  onParentMessage(msg: InterfaceMessageEvent): void {
    this.logMessage(msg.origin, msg.data);

    if (this.isValidMessage(msg)) {
      this.handleIncomingMessage(msg.data.messageId, msg.data.data, msg.data.requestId);
    }
  }

  handleIncomingMessage(
    messageId: InterfaceMessageIds,
    payload: InterfaceMessageToPayload[InterfaceMessageIds],
    requestId: RequestId,
  ): void {
    console.log(requestId);
    switch (messageId) {
      case INTERFACE_MESSAGES.ENV_INFO:
        const typedPayload = payload as InterfaceMessageToPayload[typeof INTERFACE_MESSAGES.ENV_INFO];
        _logMessageFromSafe(origin, messageId);

        setTxServiceUrl(typedPayload.txServiceUrl);
        break;

      case INTERFACE_MESSAGES.ON_SAFE_INFO: {
        /* tslint:disable-next-line:no-shadowed-variable */
        const typedPayload = payload as InterfaceMessageToPayload[typeof INTERFACE_MESSAGES.ON_SAFE_INFO];

        break;
      }

      case INTERFACE_MESSAGES.TRANSACTION_CONFIRMED: {
        /* tslint:disable-next-line:no-shadowed-variable */
        const typedPayload = payload as InterfaceMessageToPayload[typeof INTERFACE_MESSAGES.TRANSACTION_CONFIRMED];

        break;
      }

      case INTERFACE_MESSAGES.TRANSACTION_REJECTED: {
        break;
      }

      default: {
        console.warn(
          `SafeConnector: A message was received from origin ${origin} with an unknown message id: ${messageId}`,
        );
        break;
      }
    }
  }

  send<T extends SDKMessageIds, D = SDKMessageToPayload[T]>(
    messageId: T,
    data: D,
    requestId?: RequestId,
  ): SentSDKMessage<T, D> {
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
  }
}

export default InterfaceCommunicator;
export * from './messageIds';
