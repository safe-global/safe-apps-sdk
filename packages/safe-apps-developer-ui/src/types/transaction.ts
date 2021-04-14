import { ethers } from 'ethers';

export type CreateTransactionArgs = {
  baseGas?: ethers.BigNumberish;
  data: string;
  gasPrice?: ethers.BigNumberish;
  gasToken?: string;
  nonce?: number;
  operation?: number;
  refundReceiver?: string;
  safeTxGas?: ethers.BigNumberish;
  to: string;
  valueInWei: string;
};

export type ProposedTx = {
  baseGas: ethers.BigNumberish;
  data: string;
  gasPrice: ethers.BigNumberish;
  gasToken: string;
  operation: number;
  refundReceiver: string;
  nonce?: ethers.BigNumberish;
  safeTxGas: ethers.BigNumberish;
  sender?: string;
  to: string;
  valueInWei: string;
};

export type SignedProposedTx = ProposedTx & { sigs: string };
