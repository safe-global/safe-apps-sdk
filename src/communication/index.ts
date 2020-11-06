import { InterfaceMessageEvent, RequestId, Communicator, Methods, MethodToParams } from '../types';
import { generateRequestId, DEFAULT_ALLOWED_ORIGINS } from './utils';

interface CallbacksMap {
  [key: string]: (...args: unknown[]) => unknown;
}

class InterfaceCommunicator implements Communicator {
  private allowedOrigins: RegExp[] = [];
  private callbacks: CallbacksMap = {};

  constructor(allowedOrigins: RegExp[]) {
    this.allowedOrigins = [...DEFAULT_ALLOWED_ORIGINS, ...allowedOrigins];

    window.addEventListener('message', this.onParentMessage);
  }

  private isValidMessage = ({ origin, data }: InterfaceMessageEvent): boolean => {
    const emptyOrMalformed = !data;
    const unknownOrigin = this.allowedOrigins?.find((regExp) => regExp.test(origin)) === undefined;
    const sameOrigin = origin === window.origin;

    return !emptyOrMalformed && !unknownOrigin && !sameOrigin;
  };

  private logIncomingMessage = (msg: InterfaceMessageEvent): void => {
    console.info(`Safe Apps SDK v2: A message was received from origin ${msg.origin}. `, msg.data);
  };

  private onParentMessage = (msg: InterfaceMessageEvent): void => {
    this.logIncomingMessage(msg);

    if (this.isValidMessage(msg)) {
      this.handleIncomingMessage(msg.data, msg.data.requestId);
    }
  };

  private handleIncomingMessage = (params: MethodToParams[Methods], requestId: RequestId): void => {
    const cb = this.callbacks[requestId];

    if (cb) {
      cb(params);

      delete this.callbacks[requestId];
    }
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
