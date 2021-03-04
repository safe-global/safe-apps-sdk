import React from 'react';

import Layout from './components/Layout';
import ConnectDetails from './components/ProviderDetails/ConnectDetails';
import { UserDetails } from './components/ProviderDetails/UserDetails';
import ProviderAccessible from './components/ProviderInfo/ProviderAccessible';
import ProviderDisconnected from './components/ProviderInfo/ProviderDisconnected';

const HeaderComponent = (): React.ReactElement => {
  const providerName = '';
  const userAddress = '';
  // const network = null;
  const loaded = null;
  const available = false;

  const onDisconnect = () => {
    console.log('disconnect');
  };

  const getProviderInfoBased = () => {
    if (!loaded || !providerName) {
      return <ProviderDisconnected />;
    }

    return <ProviderAccessible connected={available} provider={providerName} userAddress={userAddress} />;
  };

  const getProviderDetailsBased = () => {
    if (!loaded) {
      return <ConnectDetails />;
    }

    return (
      <UserDetails
        connected={available}
        // network={network}
        onDisconnect={onDisconnect}
        providerName={providerName}
        userAddress={userAddress}
      />
    );
  };

  const info = getProviderInfoBased();
  const details = getProviderDetailsBased();

  return <Layout providerDetails={details} providerInfo={info} />;
};

export default HeaderComponent;
