import { ErrorResponse, SDKRequestData, RequestId, SuccessResponse, MethodToResponse } from '../types/index.js';
import { Methods } from './methods.js';
declare class MessageFormatter {
    static makeRequest: <M extends Methods = Methods, P = unknown>(method: M, params: P) => SDKRequestData<M, P>;
    static makeResponse: (id: RequestId, data: MethodToResponse[Methods], version: string) => SuccessResponse;
    static makeErrorResponse: (id: RequestId, error: string, version: string) => ErrorResponse;
}
export { MessageFormatter };
