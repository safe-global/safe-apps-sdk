import { InterfaceMessageEvent, Communicator, Methods, MethodToParams, MethodToResponse } from '../types';
import { generateRequestId, DEFAULT_ALLOWED_ORIGINS } from './utils';

// eslint-disable-next-line
type Callback = (response: any) => void;

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
      cb(payload.response);

      this.callbacks.delete(requestId);
    }
  };

  public send = <M extends Methods, P = MethodToParams[M], R = MethodToResponse[M]>(method: M, data: P): Promise<R> => {
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
      this.callbacks.set(requestId, (response: R) => {
        resolve(response);
      });
    });
  };
}

export default InterfaceCommunicator;
export * from './methods';
