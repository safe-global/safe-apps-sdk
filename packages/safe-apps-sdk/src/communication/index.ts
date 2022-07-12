import { MessageFormatter } from './messageFormatter';
import { Methods } from './methods';
import { InterfaceMessageEvent, Communicator, Response, SuccessResponse } from '../types';
import { Wallet } from '../wallet';
import { Permission, PermissionsError, PERMISSIONS_REQUEST_REJECTED } from '../types/permissions';

// eslint-disable-next-line
type Callback = (response: any) => void;

class PostMessageCommunicator implements Communicator {
  private readonly allowedOrigins: RegExp[] | null = null;
  private callbacks = new Map<string, Callback>();
  private debugMode = false;
  private isServer = typeof window === 'undefined';
  private wallet: Wallet;

  constructor(allowedOrigins: RegExp[] | null = null, debugMode = false) {
    this.allowedOrigins = allowedOrigins;
    this.debugMode = debugMode;
    this.wallet = new Wallet(this);

    if (!this.isServer) {
      window.addEventListener('message', this.onParentMessage);
    }
  }

  private isValidMessage = ({ origin, data, source }: InterfaceMessageEvent): boolean => {
    const emptyOrMalformed = !data;
    const sentFromParentEl = !this.isServer && source === window.parent;
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

  private hasPermissions(current: Permission[], required: Methods[]): boolean {
    return required.every((method: Methods) => {
      return !!current.find((p) => p.parentCapability === method);
    });
  }

  public send = async <M extends Methods, P, R>(
    method: M,
    params: P,
    requiredPermissions?: Methods[],
  ): Promise<SuccessResponse<R>> => {
    if (Array.isArray(requiredPermissions)) {
      let currentPermissions = await this.wallet.getPermissions();

      if (!this.hasPermissions(currentPermissions, requiredPermissions)) {
        currentPermissions = await this.wallet.requestPermissions(requiredPermissions.map((p) => ({ [p]: {} })));
      }

      if (!this.hasPermissions(currentPermissions, requiredPermissions)) {
        throw new PermissionsError('Permissions rejected', PERMISSIONS_REQUEST_REJECTED);
      }
    }

    return this.sendRequest(method, params);
  };

  private sendRequest = <M extends Methods, P, R>(method: M, params: P): Promise<SuccessResponse<R>> => {
    const request = MessageFormatter.makeRequest(method, params);

    if (this.isServer) {
      throw new Error("Window doesn't exist");
    }

    window.parent.postMessage(request, '*');
    return new Promise((resolve, reject) => {
      this.callbacks.set(request.id, (response: Response<R>) => {
        if (!response.success) {
          reject(new Error(response.error));
          return;
        }

        resolve(response);
      });
    });
  };
}

export default PostMessageCommunicator;
export * from './methods';
