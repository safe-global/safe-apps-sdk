import create from 'zustand';
import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';

type ContractNames = 'fallbackHandler' | 'proxyFactory' | 'masterCopy';
type DeployedContracts = Record<ContractNames, string>;

type ContractsMap = Record<string, DeployedContracts>;

type ContractsState = {
  contracts: ContractsMap;
  saveContracts: (networkId: ETHEREUM_NETWORK_TO_ID, deployedContracts: DeployedContracts) => void;
};

const useContractsStore = create<ContractsState>((set, get) => ({
  contracts: {},
  saveContracts(networkId: ETHEREUM_NETWORK_TO_ID, deployedContracts: DeployedContracts) {
    const { contracts } = get();

    return set({ contracts: { ...contracts, [networkId]: deployedContracts } });
  },
}));

export { useContractsStore };
