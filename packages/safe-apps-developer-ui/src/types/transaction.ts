export type ProposedTransaction = {
  baseGas: number;
  data: string;
  gasPrice: string;
  gasToken: string;
  nonce: number;
  operation: number;
  refundReceiver: string;
  safeTxGas: number;
  sender?: string;
  sigs: string;
  to: string;
  valueInWei: string;
};
