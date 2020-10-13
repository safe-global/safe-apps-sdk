import { sendMessageToInterface, SDK_MESSAGES } from 'src/communication';
import { SentSDKMessage, RequestId, RpcCallNames } from 'src/types';

type RequestArgs<T> = {
  params: T;
  requestId?: RequestId;
};

const buildRequest = (call: RpcCallNames) => (args: RequestArgs): SentSDKMessage<'RPC_CALL'> => {
  const payload = {
    call,
    params: args.params,
  };

  const message = sendMessageToInterface(SDK_MESSAGES.RPC_CALL, payload, args.requestId);

  return message;
};

export { buildRequest };
