import Onboard from 'bnc-onboard';
import React from 'react';

import Button from 'src/components/layout/Button';
import { getNetworkId } from 'src/config';
import { getWeb3, setWeb3 } from 'src/logic/wallets/getWeb3';
import { fetchProvider, removeProvider } from 'src/logic/wallets/store/actions';
import transactionDataCheck from 'src/logic/wallets/transactionDataCheck';
import { getSupportedWallets } from 'src/logic/wallets/utils/walletList';
import { store } from 'src/store';

const networkId = getNetworkId();

let lastUsedAddress = '';
let providerName;

const wallets = getSupportedWallets();

export const onboard = Onboard({
  networkId: networkId,
  subscriptions: {
    wallet: (wallet) => {
      if (wallet.provider) {
        // this function will intialize web3 and store it somewhere available throughout the dapp and
        // can also instantiate your contracts with the web3 instance
        setWeb3(wallet.provider);
        providerName = wallet.name;
      }
    },
    address: (address) => {
      if (!lastUsedAddress && address) {
        lastUsedAddress = address;
        store.dispatch(fetchProvider(providerName));
      }

      // we don't have an unsubscribe event so we rely on this
      if (!address && lastUsedAddress) {
        lastUsedAddress = '';
        providerName = undefined;
        store.dispatch(removeProvider());
      }
    },
  },
  walletSelect: {
    description: 'Please select a wallet to connect to Gnosis Safe Multisig',
    wallets,
  },
  walletCheck: [
    { checkName: 'derivationPath' },
    { checkName: 'connect' },
    { checkName: 'accounts' },
    { checkName: 'network' },
    transactionDataCheck(),
  ],
});

export const onboardUser = async (): Promise<boolean> => {
  // before calling walletSelect you want to check if web3 has been instantiated
  // which indicates that a wallet has already been selected
  // and web3 has been instantiated with that provider
  const web3 = getWeb3();
  const walletSelected = web3 ? true : await onboard.walletSelect();
  return walletSelected && onboard.walletCheck();
};

export const onConnectButtonClick = async () => {
  const walletSelected = await onboard.walletSelect();

  // perform wallet checks only if user selected a wallet
  if (walletSelected) {
    await onboard.walletCheck();
  }
};

const ConnectButton = (props): React.ReactElement => (
  <Button color="primary" minWidth={140} onClick={onConnectButtonClick} variant="contained" {...props}>
    Connect
  </Button>
);

export default ConnectButton;
