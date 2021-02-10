import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers';
import { BigNumber } from '@ethersproject/bignumber';
import { TxServiceModel } from '@gnosis.pm/safe-apps-sdk';

export function getLowerCase(value: string): string {
  if (value) {
    return value.toLowerCase();
  }
  return value;
}

export function convertSafeTxToEthersTx(tx: TxServiceModel): TransactionResponse {
  const ethersTxReceipt: TransactionReceipt = {
    to: tx.to,
    from: tx.safe,
    contractAddress: tx.safe,
    transactionIndex: 0,
    gasUsed: BigNumber.from(0),
    logsBloom: '',
    blockHash: '0x',
    transactionHash: tx.safeTxHash,
    logs: [],
    blockNumber: 0,
    confirmations: 0,
    cumulativeGasUsed: BigNumber.from(0),
    byzantium: false,
  };

  const ethersTx: TransactionResponse = {
    hash: tx.safeTxHash,
    to: tx.to,
    from: tx.safe,
    nonce: tx.nonce,
    gasLimit: BigNumber.from(tx.safeTxGas),
    gasPrice: BigNumber.from(tx.gasPrice),
    data: tx.data || '0x',
    value: BigNumber.from(tx.value),
    confirmations: 0,
    chainId: 1,
    wait: async () => ethersTxReceipt,
  };

  return ethersTx;
}
