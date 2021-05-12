import create from 'zustand';
import { Web3Provider, JsonRpcSigner } from '@ethersproject/providers';
import { connectToProvider, ETHEREUM_NETWORK_TO_ID, WALLET_PROVIDER } from 'src/api/provider';

type ProviderInfo = { loaded: boolean; account: string; name: string; networkId: ETHEREUM_NETWORK_TO_ID };

type ProviderState = ProviderInfo & {
  provider: Web3Provider | null;
  signer: JsonRpcSigner | null;
  connectProvider: () => void;
  fetchAndSetProvider: (provider: Web3Provider) => Promise<void>;
  disconnect: () => void;
  updateProvider: () => void;
};

const useProviderStore = create<ProviderState>((set, get) => ({
  loaded: false,
  account: '',
  name: WALLET_PROVIDER.UNKNOWN,
  networkId: ETHEREUM_NETWORK_TO_ID.UNKNOWN,
  provider: null,
  signer: null,

  fetchAndSetProvider: async (provider: Web3Provider) => {
    const account = (await provider.listAccounts())[0];
    const { chainId: networkId } = await provider.getNetwork();

    return set({ account, loaded: true, networkId, provider, signer: provider.getSigner() });
  },

  connectProvider: async () => {
    const { updateProvider, disconnect, fetchAndSetProvider } = get();

    const connection = await connectToProvider();

    const provider = new Web3Provider(connection, 'any');

    connection.on('chainChanged', updateProvider);
    connection.on('accountsChanged', updateProvider);
    connection.on('disconnect', disconnect);

    fetchAndSetProvider(provider);
  },

  updateProvider: async () => {
    const { provider } = get();

    if (!provider) {
      return;
    }

    const account = (await provider.listAccounts())[0];
    const { chainId: networkId } = await provider.getNetwork();

    if (!account) {
      return set({
        loaded: false,
        account: '',
        networkId: ETHEREUM_NETWORK_TO_ID.UNKNOWN,
        provider: null,
        signer: null,
      });
    }

    return set({ account, loaded: true, networkId });
  },

  disconnect: () =>
    set({
      loaded: false,
      account: '',
      networkId: ETHEREUM_NETWORK_TO_ID.UNKNOWN,
      provider: null,
      signer: null,
    }),
}));

export { useProviderStore };
