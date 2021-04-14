import React from 'react';
import { ethers } from 'ethers';
import { getEthBalance } from 'src/api/eth';
import { useProviderStore } from 'src/stores/provider';

const useEthBalance = (address: string): ethers.BigNumber => {
  const [balance, setBalance] = React.useState<ethers.BigNumber>(ethers.BigNumber.from(0));
  const signer = useProviderStore((state) => state.signer);

  React.useEffect(() => {
    const loadBalance = async (signer: ethers.providers.JsonRpcSigner, address: string) => {
      const bal = await getEthBalance(signer.provider, address);
      setBalance(bal);
    };

    if (signer) {
      loadBalance(signer, address);
    }
  }, [signer, address]);

  return balance;
};

export { useEthBalance };
