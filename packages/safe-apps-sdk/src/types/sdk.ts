export type BaseTransaction = {
  to: string;
  value: string;
  data: string;
};

export type Bytes = ArrayLike<number>;

export type BytesLike = Bytes | string;

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
  message: BytesLike;
};

export type SendTransactionsResponse = {
  safeTxHash: string;
};

export type SafeInfo = {
  safeAddress: string;
  chainId: number;
  threshold: number;
  owners: string[];
};
