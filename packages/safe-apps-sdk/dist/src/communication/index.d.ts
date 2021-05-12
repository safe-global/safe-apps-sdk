import { Communicator, Response } from '../types';
declare class PostMessageCommunicator implements Communicator {
    private readonly allowedOrigins;
    private callbacks;
    private debugMode;
    constructor(allowedOrigins?: RegExp[] | null, debugMode?: boolean);
    private isValidMessage;
    private logIncomingMessage;
    private onParentMessage;
    private handleIncomingMessage;
    send: <M extends "getEnvInfo" | "sendTransactions" | "rpcCall" | "getSafeInfo", P, R>(method: M, params: P) => Promise<Response<R>>;
}
export default PostMessageCommunicator;
export * from './methods';
