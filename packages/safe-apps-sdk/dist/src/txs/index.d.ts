import { GatewayTransactionDetails, SendTransactionsParams, Communicator, SendTransactionsResponse, BytesLike } from '../types';
declare class TXs {
    private readonly communicator;
    constructor(communicator: Communicator);
    getBySafeTxHash(safeTxHash: string): Promise<GatewayTransactionDetails>;
    signMessage(message: BytesLike): Promise<SendTransactionsResponse>;
    send({ txs, params }: SendTransactionsParams): Promise<SendTransactionsResponse>;
}
export { TXs };
