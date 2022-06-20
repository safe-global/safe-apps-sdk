import { useConnect, useDisconnect, useSendTransaction } from 'wagmi';

import { useAutoConnect } from '../useAutoConnect';

export function Connect() {
  const { activeConnector, connect, connectors, error, isConnecting, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { sendTransaction } = useSendTransaction({
    request: {
      to: 'awkweb.eth',
      value: '10000000000000000', // 0.01 ETH
    },
  });

  useAutoConnect();

  return (
    <div>
      <div>
        {activeConnector && (
          <>
            <button onClick={() => disconnect()}>Disconnect from {activeConnector.name}</button>
            <button onClick={() => sendTransaction()}>Test transaction</button>
          </>
        )}

        {connectors
          .filter((x) => x.ready && x.id !== activeConnector?.id)
          .map((x) => (
            <button key={x.id} onClick={() => connect(x)}>
              {x.name}
              {isConnecting && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}
      </div>

      {error && <div>{error.message}</div>}
    </div>
  );
}
