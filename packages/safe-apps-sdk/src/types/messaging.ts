import { Methods } from '../communication/methods';
import { SafeInfo, SendTransactionsResponse } from './sdk';
import { GatewayTransactionDetails, SafeBalances } from './gateway';

export type RequestId = string;

export type InterfaceMessageEvent = MessageEvent<Response>;

export interface MethodToResponse {
  [Methods.sendTransactions]: SendTransactionsResponse;
  [Methods.rpcCall]: unknown;
  [Methods.getSafeInfo]: SafeInfo;
  [Methods.getTxBySafeTxHash]: GatewayTransactionDetails;
  [Methods.getSafeBalances]: SafeBalances[];
  [Methods.signMessage]: SendTransactionsResponse;
}

export type SDKRequestData<M extends Methods = Methods, P = unknown> = {
  id: RequestId;
  params: P;
  env: {
    sdkVersion: string;
  };
  method: M;
};

export type SDKMessageEvent = MessageEvent<SDKRequestData>;

export type ErrorResponse = {
  id: RequestId;
  success: false;
  error: string;
  version?: string;
};

export type SuccessResponse<T = MethodToResponse[Methods]> = {
  id: RequestId;
  data: T;
  version?: string;
  success: true;
};

export type Response<T = MethodToResponse[Methods]> = ErrorResponse | SuccessResponse<T>;

export interface Communicator {
  send<M extends Methods, P = unknown, R = unknown>(method: M, params: P): Promise<SuccessResponse<R>>;
}
