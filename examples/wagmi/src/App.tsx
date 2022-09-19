import { useAccount } from 'wagmi';

import { Account, Connect, NetworkSwitcher } from './components';

export function App() {
  const { address } = useAccount();

  return (
    <>
      <Connect />

      {address && (
        <>
          <Account />
          <NetworkSwitcher />
        </>
      )}
    </>
  );
}
