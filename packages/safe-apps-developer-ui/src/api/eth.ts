import { ethers } from 'ethers';

const getEthBalance = async (signer: ethers.providers.JsonRpcSigner, address: string): Promise<ethers.BigNumber> => {
  const balance = signer.provider.getBalance(address);

  return balance;
};

export { getEthBalance };
