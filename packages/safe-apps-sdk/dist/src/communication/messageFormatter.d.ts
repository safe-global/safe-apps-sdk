import { ErrorResponse, SDKRequestData, Methods, RequestId, SuccessResponse, MethodToResponse } from '../types';
declare class MessageFormatter {
    static makeRequest: <M extends "getEnvInfo" | "sendTransactions" | "rpcCall" | "getSafeInfo" = "getEnvInfo" | "sendTransactions" | "rpcCall" | "getSafeInfo", P = unknown>(method: M, params: P) => SDKRequestData<M, P>;
    static makeResponse: (id: RequestId, data: MethodToResponse[Methods], version: string) => SuccessResponse;
    static makeErrorResponse: (id: RequestId, error: string, version: string) => ErrorResponse;
}
export { MessageFormatter };
