import { ErrorResponse, SDKRequestData, Methods, RequestId, SuccessResponse, MethodToResponse } from '../types';
declare class MessageFormatter {
    static makeRequest: <M extends "sendTransactions" | "rpcCall" | "getSafeInfo" | "getTxBySafeTxHash" | "getSafeBalances" = "sendTransactions" | "rpcCall" | "getSafeInfo" | "getTxBySafeTxHash" | "getSafeBalances", P = unknown>(method: M, params: P) => SDKRequestData<M, P>;
    static makeResponse: (id: RequestId, data: MethodToResponse[Methods], version: string) => SuccessResponse;
    static makeErrorResponse: (id: RequestId, error: string, version: string) => ErrorResponse;
}
export { MessageFormatter };
