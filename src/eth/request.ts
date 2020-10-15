import { sendMessageToInterface, SDK_MESSAGES } from 'src/communication';
import { SentSDKMessage, RequestArgs, RpcCallNames, RPCCallToParams } from 'src/types';

const buildRequest = <P extends unknown, C extends RpcCallNames>(call: C) => (
  args: RequestArgs<P>,
): SentSDKMessage<'RPC_CALL', RPCCallToParams[C]> => {
  const payload = {
    call,
    params: args.params,
  };

  const message = sendMessageToInterface(SDK_MESSAGES.RPC_CALL, payload, args.requestId);

  return message;
};

export { buildRequest };
