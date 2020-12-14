import React, { ReactElement } from 'react';
import SafeAppsSDK, { Opts } from '@gnosis.pm/safe-apps-sdk/dist/src/sdk';
import { safeAppsSDK } from './sdk';

const SafeContext = React.createContext<[SafeAppsSDK, boolean] | undefined>(undefined);

interface Props {
  loader?: ReactElement;
}

export const SafeProvider: React.FC<Props> = ({ loader = null, children }) => {
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

  if (!connected) {
    return loader;
  }

  return <SafeContext.Provider value={[safeAppsSDK, connected]}>{children}</SafeContext.Provider>;
};

export const useSafeAppsSDK = (): [SafeAppsSDK, boolean] => {
  const value = React.useContext(SafeContext);
  if (value === undefined) {
    throw new Error('You probably forgot to put <SafeProvider>.');
  }
  return value;
};

export default SafeProvider;
