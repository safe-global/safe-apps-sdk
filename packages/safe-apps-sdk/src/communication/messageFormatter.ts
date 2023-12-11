import { ErrorResponse, SDKRequestData, RequestId, SuccessResponse, MethodToResponse } from '../types/index.js';
import { getSDKVersion } from '../version.js';
import { Methods } from './methods.js';
import { generateRequestId } from './utils.js';

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

  static makeResponse = (id: RequestId, data: MethodToResponse[Methods], version: string): SuccessResponse => ({
    id,
    success: true,
    version,
    data,
  });

  static makeErrorResponse = (id: RequestId, error: string, version: string): ErrorResponse => ({
    id,
    success: false,
    error,
    version,
  });
}

export { MessageFormatter };
