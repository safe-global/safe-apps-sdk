import { Methods } from './methods';
import { Communicator, SuccessResponse } from '../types';
declare class PostMessageCommunicator implements Communicator {
    private readonly allowedOrigins;
    private callbacks;
    private debugMode;
    private isServer;
    private wallet;
    constructor(allowedOrigins?: RegExp[] | null, debugMode?: boolean);
    private isValidMessage;
    private logIncomingMessage;
    private onParentMessage;
    private handleIncomingMessage;
    send: <M extends Methods, P, R>(method: M, params: P, requiredPermissions?: Methods[]) => Promise<SuccessResponse<R>>;
    private sendRequest;
}
export default PostMessageCommunicator;
export * from './methods';
