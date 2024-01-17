import { useAccount, useSwitchChain } from 'wagmi';

export function NetworkSwitcher() {
  const { chain, chainId } = useAccount();
  const { chains, error, status, switchChain } = useSwitchChain();

  return (
    <div>
      <div>
        Connected to {chain?.name ?? chainId}
        {!chains.find((c) => c.id === chainId) && ' (unsupported)'}
      </div>

      {switchChain && (
        <div>
          {chains.map((x) =>
            x.id === chainId ? null : (
              <button key={x.id} onClick={() => switchChain({ chainId: x.id })}>
                {x.name}
                {status === 'pending' && ' (switching)'}
              </button>
            ),
          )}
        </div>
      )}

      <div>{error && error.message}</div>
    </div>
  );
}
