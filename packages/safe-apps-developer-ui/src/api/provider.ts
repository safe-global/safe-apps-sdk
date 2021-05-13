import Web3Modal, { IProviderOptions } from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider';

const WALLET_PROVIDER = {
  SAFE: 'SAFE',
  METAMASK: 'METAMASK',
  REMOTE: 'REMOTE',
  TORUS: 'TORUS',
  PORTIS: 'PORTIS',
  FORTMATIC: 'FORTMATIC',
  SQUARELINK: 'SQUARELINK',
  WALLETCONNECT: 'WALLETCONNECT',
  OPERA: 'OPERA',
  WALLETLINK: 'WALLETLINK',
  AUTHEREUM: 'AUTHEREUM',
  LEDGER: 'LEDGER',
  TREZOR: 'TREZOR',
  LATTICE: 'LATTICE',
  UNKNOWN: 'UNKNOWN',
};

const providerOptions: IProviderOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: '82b8340f4bd146a2bfc606609ffbec41',
    },
  },
};

const web3Modal = new Web3Modal({ network: 'rinkeby', providerOptions, cacheProvider: true });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const connectToProvider = async (): Promise<any> => {
  const provider = await web3Modal.connect();
  return provider;
};

const getCachedProvider = (): string => web3Modal.cachedProvider;

const clearCachedProvider = (): void => web3Modal.clearCachedProvider();

export { WALLET_PROVIDER, connectToProvider, getCachedProvider, clearCachedProvider };
