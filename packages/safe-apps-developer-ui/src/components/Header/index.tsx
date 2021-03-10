import React from 'react';

import { useProviderStore } from 'src/stores/provider';
import Layout from './components/Layout';
import ConnectDetails from './components/ProviderDetailsDropdown/ConnectDetails';
import { UserDetails } from './components/ProviderDetailsDropdown/UserDetails';
import ProviderAccessible from './components/ProviderInfo/ProviderAccessible';
import ProviderDisconnected from './components/ProviderInfo/ProviderDisconnected';

const HeaderComponent = (): React.ReactElement => {
  const userAddress = useProviderStore((state) => state.account);
  const loaded = useProviderStore((state) => state.loaded);
  const networkId = useProviderStore((state) => state.networkId);

  const onDisconnect = () => {
    console.log('disconnect');
  };

  if (!loaded) {
    return <Layout providerInfo={<ProviderDisconnected />} dropdownContent={<ConnectDetails />} />;
  }

  return (
    <Layout
      providerInfo={<ProviderAccessible connected={loaded} userAddress={userAddress} />}
      dropdownContent={
        <UserDetails connected={loaded} network={networkId} onDisconnect={onDisconnect} userAddress={userAddress} />
      }
    />
  );
};

export default HeaderComponent;
