import React, { ReactNode } from 'react';
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk/dist/src/sdk';
import { safeAppsSDK } from './sdk';

const SafeContext = React.createContext<[SafeAppsSDK, boolean] | undefined>(undefined);

interface Props {
  loading?: ReactNode;
}

export const SafeProvider: React.FC<Props> = ({ loading, children }) => {
  const [connected, setConnected] = React.useState(false);
  React.useEffect(() => {
    const fetchSafeInfo = async () => {
      try {
        await safeAppsSDK.getSafeInfo();
        setConnected(true);
      } catch (err) {
        setConnected(false);
      }
    };

    fetchSafeInfo();
  }, []);

  return (
    <div className="App">
      {connected ? <SafeContext.Provider value={[safeAppsSDK, connected]}>{children}</SafeContext.Provider> : loading}
    </div>
  );
};

export const useSafeAppsSDK = (): [SafeAppsSDK, boolean] => {
  const value = React.useContext(SafeContext);
  if (value === undefined) {
    throw new Error('You probably forgot to put <SafeProvider>.');
  }
  return value;
};

export default SafeProvider;
