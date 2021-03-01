import Web3Modal, { IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraID: '82b8340f4bd146a2bfc606609ffbec41',
    },
  },
};

const web3Modal = new Web3Modal({ network: 'rinkeby', providerOptions });

export const connectToProvider = async () => {
  const provider = await web3Modal.connect();
  console.log({ provider });
  return provider;
};
