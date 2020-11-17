import semver from 'semver';
import { InterfaceMessageEvent, Communicator, Methods, SDKRequestData } from '../types';
import { generateRequestId } from './utils';

// eslint-disable-next-line
type Callback = (response: any) => void;

class PostMessageCommunicator implements Communicator {
  private allowedOrigins: RegExp[] = [];
  private callbacks = new Map<string, Callback>();
  sdkVersion: string;

  constructor(allowedOrigins: RegExp[], sdkVersion: string) {
    this.allowedOrigins = allowedOrigins;
    this.sdkVersion = sdkVersion;

    window.addEventListener('message', this.onParentMessage);
  }

  private isValidMessage = ({ origin, data, source }: InterfaceMessageEvent): boolean => {
    const emptyOrMalformed = !data;
    const sentFromParentEl = source === window.parent;
    const sameOrigin = origin === window.origin;
    const allowedSDKVersion = typeof data.version !== 'undefined' ? semver.gte(data.version, '1.0.0') : false;

    return !emptyOrMalformed && sentFromParentEl && !sameOrigin && allowedSDKVersion;
  };

  private logIncomingMessage = (msg: InterfaceMessageEvent): void => {
    console.info(`Safe Apps SDK v2: A message was received from origin ${msg.origin}. `, msg.data);
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
    const requestId = generateRequestId();

    const message: SDKRequestData<M, P> = {
      method,
      requestId,
      params,
      env: { sdkVersion: this.sdkVersion },
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

export default PostMessageCommunicator;
export * from './methods';
