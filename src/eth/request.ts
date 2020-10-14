import { sendMessageToInterface, SDK_MESSAGES } from 'src/communication';
import { SentSDKMessage, RequestArgs, RpcCallNames } from 'src/types';

const buildRequest = <P extends unknown>(call: RpcCallNames) => (args: RequestArgs<P>): SentSDKMessage<'RPC_CALL'> => {
  const payload = {
    call,
    params: args.params,
  };

  const message = sendMessageToInterface(SDK_MESSAGES.RPC_CALL, payload, args.requestId);

  return message;
};

export { buildRequest };
