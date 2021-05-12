import { Communicator, Response } from '../types';
declare class PostMessageCommunicator implements Communicator {
    private readonly allowedOrigins;
    private callbacks;
    constructor(allowedOrigins?: RegExp[] | null);
    private isValidMessage;
    private logIncomingMessage;
    private onParentMessage;
    private handleIncomingMessage;
    send: <M extends "getEnvInfo" | "sendTransactions" | "rpcCall" | "getSafeInfo", P, R>(method: M, params: P) => Promise<Response<R>>;
}
export default PostMessageCommunicator;
export * from './methods';
