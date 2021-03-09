import create from 'zustand';
import { Web3Provider } from '@ethersproject/providers';
import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';

type ProviderState = {
  loaded: boolean;
  account: string;
  networkId: ETHEREUM_NETWORK_TO_ID;
  provider: Web3Provider | null;
  fetchAndSetProvider: (provider: Web3Provider) => Promise<void>;
};

const useProviderStore = create<ProviderState>((set) => ({
  loaded: false,
  account: '',
  networkId: ETHEREUM_NETWORK_TO_ID.UNKNOWN,
  provider: null,

  fetchAndSetProvider: async (provider: Web3Provider) => {
    const account = (await provider.listAccounts())[0];
    const { chainId: networkId } = await provider.getNetwork();

    return set({ account, loaded: true, networkId, provider });
  },
}));

export { useProviderStore };
