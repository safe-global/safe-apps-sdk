import { ChainInfo as _ChainInfo } from '@safe-global/safe-gateway-typescript-sdk';
export type ChainInfo = Pick<_ChainInfo, 'chainName' | 'chainId' | 'shortName' | 'nativeCurrency' | 'blockExplorerUriTemplate'>;
export { NativeCurrency } from '@safe-global/safe-gateway-typescript-sdk';
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
export type GetBalanceParams = {
    currency?: string;
};
export type SignMessageParams = {
    message: string;
};
export interface TypedDataDomain {
    name?: string;
    version?: string;
    chainId?: string | number | bigint | {
        toNumber: () => number;
    };
    verifyingContract?: string;
    salt?: string;
}
export interface TypedDataTypes {
    name: string;
    type: string;
}
export type TypedMessageTypes = {
    [key: string]: TypedDataTypes[];
};
export type EIP712TypedData = {
    domain: TypedDataDomain;
    types: TypedMessageTypes;
    message: Record<string, any>;
    primaryType?: string;
};
export type SignTypedMessageParams = {
    typedData: EIP712TypedData;
};
export type SendTransactionsResponse = {
    safeTxHash: string;
};
export type OffChainSignMessageResponse = {
    messageHash: string;
};
export type SignMessageResponse = SendTransactionsResponse | OffChainSignMessageResponse;
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
export type AddressBookItem = {
    address: string;
    chainId: string;
    name: string;
};
export declare const isObjectEIP712TypedData: (obj?: unknown) => obj is EIP712TypedData;
