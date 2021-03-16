import React from 'react';
import { JsonRpcSigner } from '@ethersproject/providers';
import { Contract } from 'ethers';
import { getSafeContract } from 'src/api/safeContracts';

const useSafeContract = (address: string, signer: JsonRpcSigner): Contract =>
  React.useMemo(() => getSafeContract(address, signer), [address, signer]);

export { useSafeContract };
