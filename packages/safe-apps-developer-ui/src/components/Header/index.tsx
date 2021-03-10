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
  const disconnectFromProvider = useProviderStore((state) => state.disconnect);

  if (!loaded) {
    return <Layout providerInfo={<ProviderDisconnected />} dropdownContent={<ConnectDetails />} />;
  }

  return (
    <Layout
      providerInfo={<ProviderAccessible networkId={networkId} connected={loaded} userAddress={userAddress} />}
      dropdownContent={
        <UserDetails
          connected={loaded}
          networkId={networkId}
          onDisconnect={disconnectFromProvider}
          userAddress={userAddress}
        />
      }
    />
  );
};

export default HeaderComponent;
