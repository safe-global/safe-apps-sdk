import { ethers } from 'ethers';

const getEthBalance = async (provider: ethers.providers.BaseProvider, address: string): Promise<ethers.BigNumber> => {
  const balance = provider.getBalance(address);

  return balance;
};

export { getEthBalance };
