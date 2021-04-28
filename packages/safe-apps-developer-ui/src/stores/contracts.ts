import create from 'zustand';
import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';
import { getFromLocalStorage, saveToStorage } from 'src/utils/localStorage';

type ContractNames = 'fallbackHandler' | 'proxyFactory' | 'masterCopy' | 'multiSend';
type DeployedContracts = Record<ContractNames, string>;

type ContractsMap = Record<string, DeployedContracts>;

type ContractsState = {
  contracts: ContractsMap;
  saveContracts: (networkId: ETHEREUM_NETWORK_TO_ID, deployedContracts: DeployedContracts) => void;
};

const CONTRACTS_STORE_KEY = 'contracts_state_v1';

const useContractsStore = create<ContractsState>((set, get) => ({
  contracts: getFromLocalStorage(CONTRACTS_STORE_KEY) || {},
  saveContracts(networkId: ETHEREUM_NETWORK_TO_ID, deployedContracts: DeployedContracts) {
    const { contracts } = get();

    const newContracts = { ...contracts, [networkId]: deployedContracts };
    saveToStorage(CONTRACTS_STORE_KEY, newContracts);

    return set({ contracts: newContracts });
  },
}));

export { useContractsStore };
