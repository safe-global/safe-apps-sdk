import create from 'zustand';
import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';

const useProviderStore = create(() => ({
  name: '',
  available: false,
  account: '',
  networkId: ETHEREUM_NETWORK_TO_ID.UNKNOWN,

  fetchAndSetProvider: async () => 0x0,
}));

export { useProviderStore };
