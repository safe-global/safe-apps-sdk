import { createContext, useState, useEffect, useContext, ReactElement } from 'react';
import SafeAppsSDK, { Opts as SDKOpts } from '@gnosis.pm/safe-apps-sdk/dist/src/sdk';
const SafeContext = createContext<[SafeAppsSDK, boolean] | undefined>(undefined);

interface Props {
  loader?: ReactElement;
  opts?: SDKOpts;
}

export const SafeProvider: React.FC<Props> = ({ loader = null, opts, children }) => {
  const [sdk] = useState(new SafeAppsSDK(opts));
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const fetchSafeInfo = async () => {
      try {
        await sdk.getSafeInfo();
        setConnected(true);
      } catch (err) {
        setConnected(false);
      }
    };

    fetchSafeInfo();
  }, [sdk]);

  if (!connected) {
    return loader;
  }

  return <SafeContext.Provider value={[sdk, connected]}>{children}</SafeContext.Provider>;
};

export const useSafeAppsSDK = (): [SafeAppsSDK, boolean] => {
  const value = useContext(SafeContext);

  if (value === undefined) {
    throw new Error('You probably forgot to put <SafeProvider>.');
  }

  return value;
};

export default SafeProvider;
