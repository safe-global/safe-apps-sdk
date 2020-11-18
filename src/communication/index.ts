import semver from 'semver';
import { InterfaceMessageEvent, Communicator, Methods, SDKRequestData } from '../types';
import { MessageFormatter } from './messageFormatter';
import { generateRequestId } from './utils';

// eslint-disable-next-line
type Callback = (response: any) => void;

class PostMessageCommunicator implements Communicator {
  private allowedOrigins: RegExp[] | null = null;
  private callbacks = new Map<string, Callback>();

  constructor(allowedOrigins: RegExp[]) {
    this.allowedOrigins = allowedOrigins;

    window.addEventListener('message', this.onParentMessage);
  }

  private isValidMessage = ({ origin, data, source }: InterfaceMessageEvent): boolean => {
    const emptyOrMalformed = !data;
    const sentFromParentEl = source === window.parent;
    const sameOrigin = origin === window.origin;
    const allowedSDKVersion = typeof data.version !== 'undefined' ? semver.gte(data.version, '1.0.0') : false;
    let validOrigin = true;
    if (Array.isArray(this.allowedOrigins)) {
      validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) === undefined;
    }

    return !emptyOrMalformed && sentFromParentEl && !sameOrigin && allowedSDKVersion && validOrigin;
  };

  private logIncomingMessage = (msg: InterfaceMessageEvent): void => {
    console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
  };

  private onParentMessage = (msg: InterfaceMessageEvent): void => {
    if (this.isValidMessage(msg)) {
      this.logIncomingMessage(msg);
      this.handleIncomingMessage(msg.data);
    }
  };

  private handleIncomingMessage = (payload: InterfaceMessageEvent['data']): void => {
    const { requestId } = payload;

    const cb = this.callbacks.get(requestId);
    if (cb) {
      cb(payload.response);

      this.callbacks.delete(requestId);
    }
  };

  public send = <M extends Methods, P, R>(method: M, params: P): Promise<R> => {
    const request = MessageFormatter.makeRequest(method, params);

    if (typeof window === 'undefined') {
      throw new Error("Window doesn't exist");
    }

    window.parent.postMessage(request, '*');
    return new Promise((resolve) => {
      this.callbacks.set(request.id, (response: R) => {
        resolve(response);
      });
    });
  };
}

export default PostMessageCommunicator;
export * from './methods';
