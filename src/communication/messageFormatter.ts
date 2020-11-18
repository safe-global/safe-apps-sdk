import { ErrorResponse, SDKRequestData, Methods, RequestId, InterfaceResponseData, MethodToResponse } from '../types';
import { generateRequestId } from './utils';
import { getSDKVersion } from '../utils';

class MessageFormatter {
  static makeRequest = <M extends Methods = Methods, P = unknown>(method: M, params: P): SDKRequestData<M, P> => {
    const id = generateRequestId();

    return {
      id,
      method,
      params,
      env: {
        sdkVersion: getSDKVersion(),
      },
    };
  };

  static makeResponse = (id: RequestId, response: MethodToResponse[Methods], version: string): InterfaceResponse => ({
    id,
    success: true,
    version,
    response,
  });

  static makeErrorResponse = (error: string): ErrorResponse => ({
    success: false,
    error,
  });
}

export { MessageFormatter };
