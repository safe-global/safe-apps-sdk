import { InterfaceMessageEvent, Communicator, Methods, MethodToParams } from '../types';
import { generateRequestId, DEFAULT_ALLOWED_ORIGINS } from './utils';

type Callback = (...args: unknown[]) => unknown;

class InterfaceCommunicator implements Communicator {
  private allowedOrigins: RegExp[] = [];
  private callbacks = new Map<string, Callback>();

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
      this.handleIncomingMessage(msg.data);
    }
  };

  private handleIncomingMessage = (payload: InterfaceMessageEvent['data']): void => {
    const { requestId } = payload;

    const cb = this.callbacks.get(requestId);
    if (cb) {
      console.log({ payload });
      cb(payload.params);

      this.callbacks.delete(requestId);
    }
  };

  public send = <T extends Methods, D = MethodToParams[T]>(method: T, data: D): Promise<{ requestId: string }> => {
    const requestId = generateRequestId();

    const message = {
      method,
      requestId,
      data,
    };

    if (typeof window !== 'undefined') {
      window.parent.postMessage(message, '*');
    }

    return new Promise((resolve) => {
      this.callbacks.set(requestId, (response: unknown) => {
        resolve(response as { requestId: string });
      });
    });
  };
}

export default InterfaceCommunicator;
export * from './methods';
