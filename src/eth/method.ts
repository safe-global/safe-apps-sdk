import { sendMessageToInterface, SDK_MESSAGES } from 'src/communication';
import { SentSDKMessage, RequestId } from 'src/types';

const buildRequest = (call: string) => (...params: unknown[], requestId?: RequestId): SentSDKMessage<'RPC_CALL'> => {
  const payload = {
    call,
    params,
  };

  const message = sendMessageToInterface(SDK_MESSAGES.RPC_CALL, payload, requestId);

  return message;
};

export { buildRequest };
