import { GatewayTransactionDetails, SendTransactionsParams, Communicator, SendTransactionsResponse } from '../types';
declare class TXs {
    private readonly communicator;
    constructor(communicator: Communicator);
    getBySafeTxHash(safeTxHash: string): Promise<GatewayTransactionDetails>;
    signMessage(message: string): Promise<SendTransactionsResponse>;
    signTypedMessage(message: string): Promise<SendTransactionsResponse>;
    send({ txs, params }: SendTransactionsParams): Promise<SendTransactionsResponse>;
}
export { TXs };
