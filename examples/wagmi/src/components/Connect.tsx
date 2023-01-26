import { useAccount, useConnect, useDisconnect, usePrepareSendTransaction, useSendTransaction } from 'wagmi';

import { useAutoConnect } from '../useAutoConnect';

export function Connect() {
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { isConnecting, connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const { config } = usePrepareSendTransaction({
    request: {
      to: '0x000000000000000000000000000000000000beef',
      value: '0',
    },
  });

  const { sendTransactionAsync } = useSendTransaction(config);

  useAutoConnect();

  return (
    <div>
      <div>
        {activeConnector && (
          <>
            <button onClick={() => disconnect()}>Disconnect from {activeConnector.name}</button>
            <button onClick={() => sendTransactionAsync?.()}>Test transaction</button>
          </>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== activeConnector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect({ connector: x })}>
              {x.name}
              {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
