import semver from 'semver';
import { InterfaceMessageEvent, Communicator, Methods, Response } from '../types';
import { MessageFormatter } from './messageFormatter';

// eslint-disable-next-line
type Callback = (response: any) => void;

class PostMessageCommunicator implements Communicator {
  private readonly allowedOrigins: RegExp[] | null = null;
  private callbacks = new Map<string, Callback>();
  private debugMode = false;

  constructor(allowedOrigins: RegExp[] | null = null, debugMode = false) {
    this.allowedOrigins = allowedOrigins;
    this.debugMode = debugMode;

    window.addEventListener('message', this.onParentMessage);
  }

  private isValidMessage = ({ origin, data, source }: InterfaceMessageEvent): boolean => {
    const emptyOrMalformed = !data;
    const sentFromParentEl = source === window.parent;
    const allowedSDKVersion = typeof data.version !== 'undefined' ? semver.gte(data.version, '1.0.0') : false;
    let validOrigin = true;
    if (Array.isArray(this.allowedOrigins)) {
      validOrigin = this.allowedOrigins.find((regExp) => regExp.test(origin)) !== undefined;
    }

    return !emptyOrMalformed && sentFromParentEl && allowedSDKVersion && validOrigin;
  };

  private logIncomingMessage = (msg: InterfaceMessageEvent): void => {
    console.info(`Safe Apps SDK v1: A message was received from origin ${msg.origin}. `, msg.data);
  };

  private onParentMessage = (msg: InterfaceMessageEvent): void => {
    if (this.isValidMessage(msg)) {
      this.debugMode && this.logIncomingMessage(msg);
      this.handleIncomingMessage(msg.data);
    }
  };

  private handleIncomingMessage = (payload: InterfaceMessageEvent['data']): void => {
    const { id } = payload;

    const cb = this.callbacks.get(id);
    if (cb) {
      cb(payload);

      this.callbacks.delete(id);
    }
  };

  public send = <M extends Methods, P, R>(method: M, params: P): Promise<Response<R>> => {
    const request = MessageFormatter.makeRequest(method, params);

    if (typeof window === 'undefined') {
      throw new Error("Window doesn't exist");
    }

    window.parent.postMessage(request, '*');
    return new Promise((resolve) => {
      this.callbacks.set(request.id, (response: Response<R>) => {
        resolve(response);
      });
    });
  };
}

export default PostMessageCommunicator;
export * from './methods';
