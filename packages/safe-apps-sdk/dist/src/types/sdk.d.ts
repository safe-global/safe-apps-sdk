import { ChainInfo as _ChainInfo } from '@gnosis.pm/safe-react-gateway-sdk';
export declare type ChainInfo = Pick<_ChainInfo, 'chainName' | 'chainId' | 'shortName' | 'nativeCurrency'>;
export { NativeCurrency } from '@gnosis.pm/safe-react-gateway-sdk';
export declare type BaseTransaction = {
    to: string;
    value: string;
    data: string;
};
export declare type GetTxBySafeTxHashParams = {
    safeTxHash: string;
};
export interface SendTransactionRequestParams {
    safeTxGas?: number;
}
export interface SendTransactionsParams {
    txs: BaseTransaction[];
    params?: SendTransactionRequestParams;
}
export declare type GetBalanceParams = {
    currency?: string;
};
export declare type SignMessageParams = {
    message: string;
};
export declare type SendTransactionsResponse = {
    safeTxHash: string;
};
export declare type SafeInfo = {
    safeAddress: string;
    chainId: number;
    threshold: number;
    owners: string[];
};
export declare type PostMessageOptions = {
    transfer?: any[];
};
