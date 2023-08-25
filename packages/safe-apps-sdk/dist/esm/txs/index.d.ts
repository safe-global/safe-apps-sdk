import { GatewayTransactionDetails, SendTransactionsParams, Communicator, SendTransactionsResponse, EIP712TypedData, SignMessageResponse } from '../types/index.js';
declare class TXs {
    private readonly communicator;
    constructor(communicator: Communicator);
    getBySafeTxHash(safeTxHash: string): Promise<GatewayTransactionDetails>;
    signMessage(message: string): Promise<SignMessageResponse>;
    signTypedMessage(typedData: EIP712TypedData): Promise<SignMessageResponse>;
    send({ txs, params }: SendTransactionsParams): Promise<SendTransactionsResponse>;
}
export { TXs };
