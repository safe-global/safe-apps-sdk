import { METHODS } from '../communication/methods';
import { SafeInfo } from './sdk';
import { GatewayTransactionDetails } from './gateway';

export type Methods = keyof typeof METHODS;
export type RequestId = string;

export type InterfaceMessageEvent = MessageEvent<Response>;

export interface MethodToResponse {
  [METHODS.sendTransactions]: Record<string, string>;
  [METHODS.rpcCall]: unknown;
  [METHODS.getSafeInfo]: SafeInfo;
  [METHODS.getTxBySafeTxHash]: GatewayTransactionDetails;
  [METHODS.getSafeBalances]: SafeBalances[];
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
  send<M extends Methods, P = unknown, R = unknown>(method: M, params: P): Promise<Response<R>>;
}
