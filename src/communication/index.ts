import { InterfaceMessageEvent, RequestId, Communicator, Methods, MethodToParams } from '../types';
import { generateRequestId } from './utils';

interface CallbacksMap {
  [key: string]: unknown;
}

class InterfaceCommunicator implements Communicator {
  private allowedOrigins: RegExp[] = [];
  private callbacks: CallbacksMap = {};

  constructor(allowedOrigins: RegExp[]) {
    this.allowedOrigins = allowedOrigins;

    window.addEventListener('message', this.onParentMessage);
  }

  private isValidMessage = ({ origin, data }: InterfaceMessageEvent): boolean => {
    const emptyOrMalformed = !data || !data.method;
    const unknownOrigin = this.allowedOrigins?.find((regExp) => regExp.test(origin)) === undefined;
    const sameOrigin = origin === window.origin;

    return !emptyOrMalformed && !unknownOrigin && !sameOrigin;
  };

  private logIncomingMessage = (msg: InterfaceMessageEvent): void => {
    console.info(`SafeConnector: A message was received from origin ${msg.origin}. `, msg.data);
  };

  private onParentMessage = (msg: InterfaceMessageEvent): void => {
    this.logIncomingMessage(msg);

    if (this.isValidMessage(msg)) {
      this.handleIncomingMessage(msg.data.method, msg.data.params, msg.data.requestId);
    }
  };

  private handleIncomingMessage = (method: Methods, params: MethodToParams[Methods], requestId: RequestId): void => {
    const cb = this.callbacks[requestId];

    cb && cb(params);
  };

  public send = <T extends Methods, D = MethodToParams[T]>(
    method: T,
    data: D,
    requestId?: RequestId,
  ): Promise<{ requestId: string }> => {
    if (!requestId) {
      requestId = generateRequestId();
    }

    const message = {
      method,
      requestId,
      data,
    };

    if (typeof window !== 'undefined') {
      window.parent.postMessage(message, '*');
    }

    return new Promise((resolve) => {
      this.callbacks[requestId as string] = (response: unknown) => {
        resolve(response as { requestId: string });
      };
    });
  };
}

export default InterfaceCommunicator;
export * from './methods';
