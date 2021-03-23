import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';

const getExplorerUrl = (hash: string, network: ETHEREUM_NETWORK_TO_ID): string => {
  let networkUrlPart = '';
  if (network !== ETHEREUM_NETWORK_TO_ID.MAINNET) {
    networkUrlPart = `${network}.`;
  }

  const type = hash.length > 42 ? 'tx' : 'address';
  return `https://${network}etherscan.io/${type}/${hash}`;
};

export { getExplorerUrl };
