import { ethers } from 'ethers';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';

const isTxValid = (t: Transaction): boolean => {
  if (!['string', 'number'].includes(typeof t.value)) {
    return false;
  }

  if (typeof t.value === 'string' && !/^(0x)?[0-9a-f]+$/i.test(t.value)) {
    return false;
  }

  const validToAddress = ethers.utils.isAddress(t.to);
  return validToAddress && !!t.data && typeof t.data === 'string';
};

export { isTxValid };
