import { ethers } from 'ethers';
import { getSafeContract } from './safeContracts';

const getSafeNonce = async (signer: ethers.providers.JsonRpcSigner, safeAddress: string): Promise<ethers.BigNumber> => {
  const safe = getSafeContract(safeAddress, signer);
  const nonce = await safe.nonce();

  return nonce;
};

export { getSafeNonce };
