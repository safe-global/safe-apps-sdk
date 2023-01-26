import { createContext, useState, useEffect, useContext, useMemo, ReactElement } from 'react';
import SafeAppsSDK, { Opts as SDKOpts, SafeInfo } from '@safe-global/safe-apps-sdk';

type SafeReactSDKContext = {
  sdk: SafeAppsSDK;
  connected: boolean;
  safe: SafeInfo;
};

const SafeContext = createContext<SafeReactSDKContext | undefined>(undefined);

interface Props {
  loader?: ReactElement;
  opts?: SDKOpts;
  children: React.ReactNode;
}

export const SafeProvider: React.FC<Props> = ({ loader = null, opts, children }) => {
  const [sdk] = useState(() => new SafeAppsSDK(opts));
  const [connected, setConnected] = useState(false);
  const [safe, setSafe] = useState<SafeInfo>({
    safeAddress: '',
    chainId: 1,
    threshold: 1,
    owners: [],
    isReadOnly: true,
  });
  const contextValue = useMemo(() => ({ sdk, connected, safe }), [sdk, connected, safe]);

  useEffect(() => {
    let active = true;
    const fetchSafeInfo = async () => {
      try {
        const safeInfo = await sdk.safe.getInfo();

        if (!active) {
          return;
        }
        setSafe(safeInfo);
        setConnected(true);
      } catch (err) {
        if (!active) {
          return;
        }
        setConnected(false);
      }
    };

    fetchSafeInfo();

    return () => {
      active = false;
    };
  }, [sdk]);

  if (!connected && loader) {
    return loader;
  }

  return <SafeContext.Provider value={contextValue}>{children}</SafeContext.Provider>;
};

export const useSafeAppsSDK = (): SafeReactSDKContext => {
  const value = useContext(SafeContext);

  if (value === undefined) {
    throw new Error('You probably forgot to put <SafeProvider>.');
  }

  return value;
};

export default SafeProvider;
