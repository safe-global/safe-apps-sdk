import React from 'react';
import { JsonRpcSigner } from '@ethersproject/providers';
import GnosisSafeSol from '@gnosis.pm/safe-contracts/build/contracts/GnosisSafe.json';
import { Contract } from 'ethers';

const useSafeContract = (address: string, signer: JsonRpcSigner): Contract =>
  React.useMemo(() => new Contract(address, GnosisSafeSol.abi, signer), [address, signer]);

export { useSafeContract };
