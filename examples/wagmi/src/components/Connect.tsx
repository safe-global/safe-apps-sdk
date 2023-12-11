import {
  useAccount,
  useConnect,
  useContractWrite,
  useDisconnect,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi';

import { useAutoConnect } from '../useAutoConnect';

export function Connect() {
  const { connect, connectors, error, pendingConnector } = useConnect();
  const { isConnecting, connector: activeConnector } = useAccount();
  const { disconnect } = useDisconnect();
  const { config } = usePrepareSendTransaction({
    to: '0x000000000000000000000000000000000000beef',
    value: BigInt('0'),
  });

  const { sendTransactionAsync } = useSendTransaction(config);

  const { config: config2 } = usePrepareContractWrite({
    // wagmi mint example contract
    address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
    abi: [
      {
        name: 'mint',
        type: 'function',
        stateMutability: 'nonpayable',
        inputs: [],
        outputs: [],
      },
    ],
    functionName: 'mint',
  });

  const { write } = useContractWrite(config2);

  useAutoConnect();

  return (
    <div>
      <div>
        {activeConnector && (
          <>
            <button onClick={() => disconnect()}>Disconnect from {activeConnector.name}</button>
            <button onClick={() => write?.()}>Test WagmiMintExample write contract transaction</button>
            <button onClick={() => sendTransactionAsync?.()}>Test send transaction</button>
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
