import { MessageFormatter } from './messageFormatter';
import { Methods } from './methods';
import { InterfaceMessageEvent, Communicator, Response, SuccessResponse } from '../types';

type Meta = { origin: string };
// eslint-disable-next-line
type Callback = (response: any, meta: Meta) => void;

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
    const majorVersionNumber = typeof data.version !== 'undefined' && parseInt(data.version.split('.')[0]);
    const allowedSDKVersion = majorVersionNumber >= 1;
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
      this.handleIncomingMessage(msg.data, { origin: msg.origin });
    }
  };

  private handleIncomingMessage = (payload: InterfaceMessageEvent['data'], meta: Meta): void => {
    const { id } = payload;

    const cb = this.callbacks.get(id);
    if (cb) {
      cb(payload, meta);

      this.callbacks.delete(id);
    }
  };

  public send = <M extends Methods, P, R>(method: M, params: P): Promise<SuccessResponse<R>> => {
    const request = MessageFormatter.makeRequest(method, params);

    if (typeof window === 'undefined') {
      throw new Error("Window doesn't exist");
    }

    window.parent.postMessage(request, '*');
    return new Promise((resolve, reject) => {
      this.callbacks.set(request.id, (response: Response<R>, meta: Meta) => {
        if (!response.success) {
          reject(new Error(response.error));
          return;
        }

        resolve({ ...response, data: { ...response.data, meta } });
      });
    });
  };
}

export default PostMessageCommunicator;
export * from './methods';
