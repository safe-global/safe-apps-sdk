import React from 'react';

import { useProviderStore } from 'src/stores/provider';
import Layout from './components/Layout';
import ConnectDetails from './components/ProviderDetails/ConnectDetails';
import { UserDetails } from './components/ProviderDetails/UserDetails';
import ProviderAccessible from './components/ProviderInfo/ProviderAccessible';
import ProviderDisconnected from './components/ProviderInfo/ProviderDisconnected';

const HeaderComponent = (): React.ReactElement => {
  const userAddress = useProviderStore((state) => state.account);
  const loaded = useProviderStore((state) => state.loaded);
  const networkId = useProviderStore((state) => state.networkId);

  const onDisconnect = () => {
    console.log('disconnect');
  };

  const getProviderInfoBased = () => {
    if (!loaded) {
      return <ProviderDisconnected />;
    }

    return <ProviderAccessible connected={loaded} userAddress={userAddress} />;
  };

  const getProviderDetailsBased = () => {
    if (!loaded) {
      return <ConnectDetails />;
    }

    return <UserDetails connected={loaded} network={networkId} onDisconnect={onDisconnect} userAddress={userAddress} />;
  };

  const info = getProviderInfoBased();
  const details = getProviderDetailsBased();

  return <Layout providerDetails={details} providerInfo={info} />;
};

export default HeaderComponent;
