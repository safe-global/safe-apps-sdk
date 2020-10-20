import { sendMessageToInterface, SDK_MESSAGES } from '../communication';
import { SentSDKMessage, RequestArgs, RpcCallNames, RPCPayload } from '../types';

const buildRequest = <P extends unknown, C extends RpcCallNames>({
  call,
  inputFormatters,
}: {
  call: C;
  inputFormatters?: (((...args: unknown[]) => unknown) | null)[];
}) => (args: RequestArgs<P>): SentSDKMessage<'RPC_CALL', RPCPayload<C, P>> => {
  const params = args.params;

  if (inputFormatters) {
    inputFormatters.forEach((formatter: ((...args: unknown[]) => unknown) | null) => {
      formatter?.(args.params);
    });
  }

  const payload = {
    call,
    params,
  };

  const message = sendMessageToInterface(SDK_MESSAGES.RPC_CALL, payload, args.requestId);

  return message;
};

export { buildRequest };
