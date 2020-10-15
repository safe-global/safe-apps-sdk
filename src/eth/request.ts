import { sendMessageToInterface, SDK_MESSAGES } from '../communication';
import { SentSDKMessage, RequestArgs, RpcCallNames, RPCPayload } from '../types';

const buildRequest = <P extends unknown, C extends RpcCallNames>(call: C) => (
  args: RequestArgs<P>,
): SentSDKMessage<'RPC_CALL', RPCPayload<C, P>> => {
  const payload = {
    call,
    params: args.params,
  };

  const message = sendMessageToInterface(SDK_MESSAGES.RPC_CALL, payload, args.requestId);

  return message;
};

export { buildRequest };
