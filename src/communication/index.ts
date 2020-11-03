import { InterfaceMessageEvent, RequestId, Communicator, Methods, MethodToParams } from '../types';
import { generateRequestId } from './utils';

class InterfaceCommunicator implements Communicator {
  private allowedOrigins: RegExp[] = [];
  private callbacks = {};

  constructor(allowedOrigins: RegExp[]) {
    this.allowedOrigins = allowedOrigins;

    window.addEventListener('message', this.onParentMessage);
  }

  private isValidMessage({ origin, data }: InterfaceMessageEvent): boolean {
    const emptyOrMalformed = !data || !data.method;
    const unknownOrigin = this.allowedOrigins?.find((regExp) => regExp.test(origin)) === undefined;
    const sameOrigin = origin === window.origin;

    return !emptyOrMalformed && !unknownOrigin && !sameOrigin;
  }

  private logIncomingMessage(msg: InterfaceMessageEvent): void {
    console.info(`SafeConnector: A message was received from origin ${msg.origin}. `, msg.data);
  }

  private onParentMessage(msg: InterfaceMessageEvent): void {
    this.logIncomingMessage(msg);

    if (this.isValidMessage(msg)) {
      this.handleIncomingMessage(msg.data.method, msg.data.params, msg.data.requestId);
    }
  }

  private handleIncomingMessage(method: Methods, params: MethodToParams[Methods], requestId: RequestId): void {
    console.log({ method, params, requestId });
  }

  public send<T extends Methods, D = MethodToParams[T]>(messageId: T, data: D, requestId?: RequestId): unknown {
    if (!requestId) {
      requestId = generateRequestId();
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
export * from './methods';
