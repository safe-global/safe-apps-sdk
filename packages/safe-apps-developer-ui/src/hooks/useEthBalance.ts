import React from 'react';
import { ethers } from 'ethers';
import { getEthBalance } from 'src/api/eth';
import { useProviderStore } from 'src/stores/provider';

const useEthBalance = (address: string, poll = false): ethers.BigNumber => {
  const [balance, setBalance] = React.useState<ethers.BigNumber>(ethers.BigNumber.from(0));
  const signer = useProviderStore((state) => state.signer);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    const loadBalance = async (signer: ethers.providers.JsonRpcSigner, address: string) => {
      const bal = await getEthBalance(signer.provider, address);

      // calling setBalance triggers a re-render
      if (!balance.eq(bal)) {
        setBalance(bal);
      }
    };

    if (signer) {
      loadBalance(signer, address);

      if (poll) {
        interval = setInterval(() => {
          loadBalance(signer, address);
        }, 2000);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [signer, address, poll, balance]);

  return balance;
};

export { useEthBalance };
