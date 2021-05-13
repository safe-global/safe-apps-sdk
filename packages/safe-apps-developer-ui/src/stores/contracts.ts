import create from 'zustand';
import { getFromLocalStorage, saveToStorage } from 'src/utils/localStorage';

type ContractNames = 'fallbackHandler' | 'proxyFactory' | 'masterCopy' | 'multiSend';
type DeployedContracts = Record<ContractNames, string>;

type ContractsMap = Record<string, DeployedContracts>;

type ContractsState = {
  contracts: ContractsMap;
  saveContracts: (chainId: number, deployedContracts: DeployedContracts) => void;
};

const CONTRACTS_STORE_KEY = 'contracts_state_v1';

const useContractsStore = create<ContractsState>((set, get) => ({
  contracts: getFromLocalStorage(CONTRACTS_STORE_KEY) || {},
  saveContracts(chainId: number, deployedContracts: DeployedContracts) {
    const { contracts } = get();

    const newContracts = { ...contracts, [chainId]: deployedContracts };
    saveToStorage(CONTRACTS_STORE_KEY, newContracts);

    return set({ contracts: newContracts });
  },
}));

export { useContractsStore };
