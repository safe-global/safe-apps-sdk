import { ChainInfo as _ChainInfo } from '@gnosis.pm/safe-react-gateway-sdk';

export type ChainInfo = Pick<_ChainInfo, 'chainName' | 'chainId' | 'shortName' | 'nativeCurrency'>;

export { NativeCurrency } from '@gnosis.pm/safe-react-gateway-sdk';

export type BaseTransaction = {
  to: string;
  value: string;
  data: string;
};

export type GetTxBySafeTxHashParams = {
  safeTxHash: string;
};

export interface SendTransactionRequestParams {
  safeTxGas?: number;
}

export interface SendTransactionsParams {
  txs: BaseTransaction[];
  params?: SendTransactionRequestParams;
}

export type GetBalanceParams = { currency?: string };

export type SignMessageParams = {
  message: string;
};

export type SendTransactionsResponse = {
  safeTxHash: string;
};

export type SafeInfo = {
  safeAddress: string;
  chainId: number;
  threshold: number;
  owners: string[];
  isReadOnly: boolean;
};

export type EnvironmentInfo = {
  origin: string;
};

export type PostMessageOptions = {
  transfer?: any[];
};
