import { Methods } from '../communication/methods';
import { SafeInfo } from './sdk';
import { GatewayTransactionDetails, SafeBalances } from './gateway';
export declare type RequestId = string;
export declare type InterfaceMessageEvent = MessageEvent<Response>;
export interface MethodToResponse {
    [Methods.sendTransactions]: Record<string, string>;
    [Methods.rpcCall]: unknown;
    [Methods.getSafeInfo]: SafeInfo;
    [Methods.getTxBySafeTxHash]: GatewayTransactionDetails;
    [Methods.getSafeBalances]: SafeBalances[];
}
export declare type SDKRequestData<M extends Methods = Methods, P = unknown> = {
    id: RequestId;
    params: P;
    env: {
        sdkVersion: string;
    };
    method: M;
};
export declare type SDKMessageEvent = MessageEvent<SDKRequestData>;
export declare type ErrorResponse = {
    id: RequestId;
    success: false;
    error: string;
    version?: string;
};
export declare type SuccessResponse<T = MethodToResponse[Methods]> = {
    id: RequestId;
    data: T;
    version?: string;
    success: true;
};
export declare type Response<T = MethodToResponse[Methods]> = ErrorResponse | SuccessResponse<T>;
export interface Communicator {
    send<M extends Methods, P = unknown, R = unknown>(method: M, params: P): Promise<SuccessResponse<R>>;
}
